import {makeAutoObservable} from "mobx";
import {
  ICastMovie, ICastTv,
  ICrewMovie, ICrewTv,
  IImagesPersonFetching,
  IImagesWatchFetching,
  IMovieAllInfos,
  IMovieDetails,
  IPersonAllData,
  IPersonFetching,
  IPersonSearch,
  ITvAllInfos,
  ITvDetails,
} from "../interfaces/interfaces";
import {doc, setDoc} from "firebase/firestore";
import firestoreDb from "../firebase-config";
import {
  castUrl,
  emptyMovie,
  emptyPerson,
  emptyTvShow,
  imagesUrl,
  watchDetailsUrl, personDetailUrl,
  searchUrl
} from "../constants";
import {TCategory, TCategoryWatch, THasHappyEnd} from "../interfaces/types";
import globalStore from "./global-store";

const {user} = globalStore;


class ApiStore {

  selectedMovie: IMovieAllInfos = emptyMovie;
  selectedTv: ITvAllInfos = emptyTvShow;
  selectedPerson: IPersonAllData = emptyPerson;

  constructor() {
    makeAutoObservable(this);
  }

  //Save Movie to Database Firebase by clicking on Detailansicht Speichern
  async saveMovieToDb(movieDb: any): Promise<void> {
    try {
      const actualMoviesDoc = doc(firestoreDb, "movies/" + movieDb.id);
      await setDoc(actualMoviesDoc, movieDb);
      console.log("In Firestore Gespeichert:", movieDb);
    } catch (e) {
      console.log("Error", e);
    }
  }

  //Get genres and fsk and has_happy_end and save to selectedMovie state
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
  private setAllDataForMovie = async (object: any, searchCategory: TCategoryWatch = "movie"): Promise<void> => {
    console.log("setAllDataForMovie", object, searchCategory)
    const details: IMovieDetails = await this.getDetailWatchInfos(object.id, "movie") as IMovieDetails;
    const images: IImagesWatchFetching = await this.getImagesFromTmdb(object.id, "movie") as IImagesWatchFetching;
    const fsk: number = await this.getGermanFSKFromDetails(details, "movie");
    const hasHappyEnd: THasHappyEnd = await this.calculateHappyEnd(object);
    const castAndCrew: (ICastMovie | ICrewMovie)[] = await this.getCastAndCrewFromMedia(object.id, "movie");
    const cast: ICastMovie[] = await this.getCastFromMedia(object.id, "movie");
    const directors: ICrewMovie[] = await this.getDirectorFromMovie(object.id);

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
    this.selectedMovie = completeMovieInfo;
    console.log("selectedMovie:", completeMovieInfo);
  }

  //Get Details infos from Movie
  private async getDetailWatchInfos(id: number, categoryWatch: TCategoryWatch): Promise<IMovieDetails | ITvDetails> {
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
  private async getGermanFSKFromDetails(detailsObject: any, category: TCategoryWatch): Promise<number> {
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
    if (typeof movie.happyEnd_Voting === "object") {
      const happyEndArray = Object.values(movie.happyEnd_Voting);
      const trueCount = happyEndArray.reduce((acc: number, current) => {
        if (current) acc++;
        else if (!current) acc--;
        return acc;
      }, 0);
      if (trueCount > 0) return "true";
      else if (trueCount === 0 || movie.happyEnd_Voting === false)
        return "neutral";
      else return "false";
    } else return "neutral";
  };

  //Get Cast and Crew for Movie
  private getCastAndCrewFromMedia = async (movieId: number, searchCategory: TCategoryWatch): Promise<(ICastMovie | ICrewMovie)[]> => {
    const castUrlMovie = castUrl(searchCategory, movieId);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    const directors: ICrewMovie[] | ICrewTv[] = await this.getDirectorFromMovie(movieId);
    return data.cast.concat(directors);
  };

  //Get Cast for Movie
  private async getCastFromMedia(movieId: number, searchCategory: TCategoryWatch): Promise<ICastMovie[]> {
    const castUrlMovie = castUrl(searchCategory, movieId);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    return data.cast;
  };

  //Get Director for Movie
  private async getDirectorFromMovie(movieId: number): Promise<ICrewMovie[]> {
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
  private setAllDataForTv = async (object: any, searchCategory: TCategoryWatch): Promise<void> => {
    const details: IMovieDetails = await this.getDetailWatchInfos(object.id, "tv") as IMovieDetails;
    const images: IImagesWatchFetching = await this.getImagesFromTmdb(object.id, "tv") as IImagesWatchFetching;
    const fsk: number = await this.getGermanFSKFromDetails(details, "tv");
    const hasHappyEnd: THasHappyEnd = await this.calculateHappyEnd(object);
    const castAndCrew: (ICastMovie | ICrewMovie)[] = await this.getCastAndCrewFromMedia(object.id, "tv");
    const cast: ICastMovie[] = await this.getCastFromMedia(object.id, "tv");
    const directors: ICrewTv[] = await this.getDirectorFromTv(object.id);

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
    this.selectedTv = completeTvInfo;
    console.log("selectedTv:", completeTvInfo);
  }

  //Get Director for TV
  private async getDirectorFromTv(movieId: number): Promise<ICrewTv[]> {
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
  private setAllDataForPerson = async (object: any): Promise<void> => {
    const personKnownFor: IPersonSearch = await this.getInfosForPersonFromApi(object.name);
    const personDetails: IPersonFetching = await this.getDetailPersonInfosFromApi(object.id);
    this.selectedPerson = {...object, ...personKnownFor, ...personDetails};
  }

  //Get known_for movies and other infos from person
  private async getInfosForPersonFromApi(name: string): Promise<IPersonSearch> {
    const response = await fetch(searchUrl("person", name, 1));
    const data = await response.json();
    const result = await data.results[0];
    return result;
  };

  //Get Biography, Birthday and other detailed infos and Images from person
  private async getDetailPersonInfosFromApi(personId: number): Promise<IPersonFetching> {
    const response = await fetch(personDetailUrl(personId));
    let data = await response.json();
    return data;
  };

}


const apiStore = new ApiStore();
export default apiStore;