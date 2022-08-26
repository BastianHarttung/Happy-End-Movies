import {makeAutoObservable} from "mobx";
import {
  IImagesPersonFetching,
  IImagesWatchFetching, ISearch,
} from "../models/interfaces/interfaces";
import {
  castUrl,
  imagesUrl,
  watchDetailsUrl, personDetailUrl,
  searchUrl, trendingMoviesUrl
} from "../constants";
import {TCategory, TCategoryMedia, TCategorySearch, THasHappyEnd, TSearchResults} from "../models/types";
import {ICastMovie, ICrewMovie, IMovieAllInfos, IMovieDetails} from "../models/interfaces/movie-interfaces";
import {ICastTv, ICrewTv, ITvAllInfos, ITvDetails} from "../models/interfaces/tv-interfaces";
import {IPersonAllData, IPersonFetching, IPersonSearch} from "../models/interfaces/person-interfaces";
import {EHasHappyEnd} from "../models/enums";
import globalStore from "./global-store";
import {ITmdbStoreInterface} from "../models/interfaces/stores-interfaces/tmdb-store-interface";


const {user} = globalStore;

class TmdbStore {

  searchedMedias: TSearchResults[] = [];

  searchCategory: string = "";

  isLoadingTmdb: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getPopularMoviesFromTmdb = async (): Promise<TSearchResults[]> => {
    const response = await fetch(trendingMoviesUrl);
    let data = await response.json();
    return data.results;
  }

  getJsonFromTmdb = async (movieName: string, pageNumber: number, searchCategory: TCategorySearch): Promise<ISearch> => {
    const response = await fetch(searchUrl(searchCategory, movieName, pageNumber));
    let data = await response.json();
    console.log("data from Tmdb", data);
    return data;
  }

  saveSelectedMovieOrPerson = async (object: any, searchCategory: TCategory): Promise<void> => {
    if (searchCategory === "movie") {
      await this.setAllDataForMovie(object, "movie")
    } else if (searchCategory === "tv") {
      await this.setAllDataForTv(object, "tv")
    } else {
      await this.setAllDataForPerson(object)
    }
  };

  //-------------------------------Movie Fetches--------------------------------------------------------------
  // Collecting all Data from Movie
  public setAllDataForMovie = async (object: any, searchCategory: TCategoryMedia = "movie"): Promise<IMovieAllInfos> => {
    console.log("setAllDataForMovie", object, searchCategory)
    const details: IMovieDetails = await this.getDetailWatchInfos(object.id, "movie") as IMovieDetails;
    const images: IImagesWatchFetching = await this.getImagesFromTmdb(object.id, "movie") as IImagesWatchFetching;
    const fsk: number = await this.getGermanFSKFromDetails(details, "movie");
    const hasHappyEnd: THasHappyEnd = object.userSelections ? await this.calculateHappyEnd(object) : EHasHappyEnd.NEUTRAL;
    const castAndCrew: (ICastMovie | ICrewMovie)[] = await this.getCastAndCrewFromMedia(object.id, "movie");
    const cast: ICastMovie[] = await this.getCastFromMedia(object.id, "movie") as ICastMovie[];
    const directors: ICrewMovie[] = await TmdbStore.getDirectorFromMovie(object.id);

    const completeMovieInfo: IMovieAllInfos = {
      ...object,
      ...details,
      images,
      category: searchCategory,
      fsk,
      userSelections: object.userSelections ? object.userSelections
        : {
          [user.userId]: {
            happyEnd_Voting: object.userSelections
              ? object.userSelections[user.userId].happyEnd_Voting
              : "",
            haveSeen: object.userSelections
              ? object.userSelections[user.userId].haveSeen
              : false,
          },
        },
      has_happy_end: hasHappyEnd,
      castAndCrew,
      cast,
      directors,
    };
    console.log("selectedMovie:", completeMovieInfo);
    return completeMovieInfo;
  }

  //Get Details infos from Movie
  private async getDetailWatchInfos(id: number, categoryWatch: TCategoryMedia): Promise<IMovieDetails | ITvDetails> {
    const response = await fetch(watchDetailsUrl(categoryWatch, id));
    let data = await response.json();
    return data;
  };

  //Get Images from Movie
  private async getImagesFromTmdb(id: number, category: TCategory): Promise<IImagesWatchFetching | IImagesPersonFetching> {
    const response = await fetch(imagesUrl(category, id));
    let data = await response.json();
    return data;
  };

  //Get German FSK from Detail Infos
  private async getGermanFSKFromDetails(detailsObject: any, category: TCategoryMedia): Promise<number> {
    if (category === "movie") {
      const releaseGerman = detailsObject.releases.countries.find(
        (country: any) => country.iso_3166_1 === "DE",
      );
      if (!!releaseGerman) return +releaseGerman.certification;
      else return 400;
    } else if (category === "tv") {
      const ratingsGerman = detailsObject.content_ratings.results.find(
        (country: any) => country.iso_3166_1 === "DE",
      );
      if (!!ratingsGerman) return +ratingsGerman.rating;
      else return 400;
    } else return 500
  };

  //Calculate has_happy_end by counting happyEnd_Voting
  private calculateHappyEnd(movie: any): THasHappyEnd {
    let happyCount = 0;
    Object.keys(movie.userSelections).forEach((user) => {
      if (movie.userSelections[user].happyEnd_Voting === EHasHappyEnd.TRUE) happyCount++
      if (movie.userSelections[user].happyEnd_Voting === EHasHappyEnd.FALSE) happyCount--
    })
    if (happyCount >= 1) return EHasHappyEnd.TRUE
    if (happyCount <= -1) return EHasHappyEnd.FALSE
    else return EHasHappyEnd.NEUTRAL
    // if (typeof movie.userSelections === "object") {
    //   const happyEndArray = Object.values(movie.happyEnd_Voting);
    //   const trueCount = happyEndArray.reduce((acc: number, current) => {
    //     if (current) acc++;
    //     else if (!current) acc--;
    //     return acc;
    //   }, 0);
    //   if (trueCount > 0) return "true";
    //   else if (trueCount === 0 || movie.happyEnd_Voting === false)
    //     return "neutral";
    //   else return "false";
    // } else return "neutral";
  };

  private getCastAndCrewFromMedia = async (movieId: number, searchCategory: TCategoryMedia): Promise<(ICastMovie | ICrewMovie)[]> => {
    const castUrlMovie = castUrl(searchCategory, movieId);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    const directors: ICrewMovie[] | ICrewTv[] = await TmdbStore.getDirectorFromMovie(movieId);
    return data.cast.concat(directors);
  };

  private async getCastFromMedia(movieId: number, searchCategory: TCategoryMedia): Promise<(ICastMovie | ICastTv)[]> {
    const castUrlMovie = castUrl(searchCategory, movieId);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    return data.cast;
  };

  private static async getDirectorFromMovie(movieId: number): Promise<ICrewMovie[]> {
    const castUrlMovie = castUrl("movie", movieId);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    let directorArray = [];
    for (let i = 0; i < data.crew.length; i++) {
      if (data.crew[i].job === "Director") {
        directorArray.push(data.crew[i]);
      }
    }
    return directorArray;
  };

  // private getDirectorFromMedia = async (movieId: number, searchCategory: TCategoryWatch) => {
  //   if (searchCategory === "movie") {
  //     const movieDirectors = await this.getDirectorFromMovie(movieId)
  //     return movieDirectors
  //   } else {
  //     const tvDirectors = await this.getDirectorFromTv(movieId)
  //     return tvDirectors
  //   }
  // }

  //Concat Cast and Directors (TODO not sure if needed)
  public concatCastAndCrew(castArray: ICastMovie[] | ICastTv[], crewArray: ICrewMovie[] | ICrewTv[]): (ICrewMovie | ICastMovie | ICrewTv | ICastTv)[] {
    return [...castArray, ...crewArray]
  }

  //-----------------------------------TV Show fetches ---------------------------------------------
  public setAllDataForTv = async (object: any, searchCategory: TCategoryMedia): Promise<ITvAllInfos> => {
    const details: IMovieDetails = await this.getDetailWatchInfos(object.id, "tv") as IMovieDetails;
    const images: IImagesWatchFetching = await this.getImagesFromTmdb(object.id, "tv") as IImagesWatchFetching;
    const fsk: number = await this.getGermanFSKFromDetails(details, "tv");
    const hasHappyEnd: THasHappyEnd = await this.calculateHappyEnd(object);
    const castAndCrew: (ICastMovie | ICrewMovie)[] = await this.getCastAndCrewFromMedia(object.id, "tv");
    const cast: ICastTv[] = await this.getCastFromMedia(object.id, "tv") as ICastTv[];
    const directors: ICrewTv[] = await TmdbStore.getDirectorFromTv(object.id);

    const completeTvInfo: ITvAllInfos = {
      ...object,
      ...details,
      images,
      category: searchCategory,
      fsk,
      userSelections: {
        [user.userId]: {
          happyEnd_Voting: object.userSelections
            ? object.userSelections[user.userId].happyEnd_Voting
            : "",
          haveSeen: object.userSelections
            ? object.userSelections[user.userId].haveSeen
            : false,
        },
      },
      has_happy_end: hasHappyEnd,
      castAndCrew,
      cast,
      directors,
    };
    console.log("selectedTv:", completeTvInfo);
    return completeTvInfo;
  }

  //Get Director for TV
  private static async getDirectorFromTv(movieId: number): Promise<ICrewTv[]> {
    const castUrlTv = castUrl("tv", movieId);
    const response = await fetch(castUrlTv);
    let data = await response.json();
    let directorArray = [];
    for (let i = 0; i < data.crew.length; i++) {
      for (let j = 0; j < data.crew[i].jobs.length; j++) {
        if (data.crew[i].jobs[j] === "Director") {
          directorArray.push(data.crew[i]);
        }
      }
    }
    return directorArray;
  };

  //-------------------------------------Person fetches---------------------------------------------
  // Collecting all Data from Person
  public setAllDataForPerson = async (object: any): Promise<IPersonAllData> => {
    const personKnownFor: IPersonSearch = await TmdbStore.getInfosForPersonFromApi(object.name);
    const personDetails: IPersonFetching = await TmdbStore.getDetailPersonInfosFromApi(object.id);
    return {...object, ...personKnownFor, ...personDetails};
  }

  //Get known_for movies and other infos from person
  private static async getInfosForPersonFromApi(name: string): Promise<IPersonSearch> {
    const response = await fetch(searchUrl("person", name, 1));
    const data = await response.json();
    const result = await data.results[0];
    return result;
  };

  //Get Biography, Birthday and other detailed infos and Images from person
  private static async getDetailPersonInfosFromApi(personId: number): Promise<IPersonFetching> {
    const response = await fetch(personDetailUrl(personId));
    let data = await response.json();
    return data;
  };

}


const tmdbStore: ITmdbStoreInterface = new TmdbStore();
export default tmdbStore;