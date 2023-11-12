import { makeAutoObservable, runInAction } from "mobx";
import {
  castUrl,
  imagesUrl,
  watchDetailsUrl,
  personDetailUrl,
  searchUrl,
  trendingMoviesUrl,
} from "../constants";
import globalStore from "./global-store";
//Models
import {
  TCategory,
  TCategoryMedia,
  TCategorySearch,
  THasHappyEnd,
  TSearchResults,
} from "../models/types";
import {
  IImagesWatchFetching,
  ISearch,
  IUserSelections,
} from "../models/interfaces/interfaces";
import {
  ICastMovie,
  ICrewMovie,
  IMovieAllInfos,
  IMovieDetails,
} from "../models/interfaces/movie-interfaces";
import {
  ICastTv,
  ICrewTv,
  ITvAllInfos,
  ITvDetails,
} from "../models/interfaces/tv-interfaces";
import {
  IPersonAllData,
  IPersonFetching,
  IPersonSearch,
} from "../models/interfaces/person-interfaces";
import { EHasHappyEnd } from "../models/enums";
import { ITmdbStoreInterface } from "../models/interfaces/stores-interfaces/tmdb-store-interface";


class TmdbStore {
  globalStore = globalStore;

  searchedMedias: TSearchResults[] = [];

  searchResult: string = ""; // To show String which Results are for

  searchTotalResults: number = 0;

  popularMedias: TSearchResults[] = [];

  isLoadingTmdb: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public resetTmdbStore = () => {
    this.searchResult = "";
    this.searchTotalResults = 0;
    this.searchedMedias = [];
    this.isLoadingTmdb = false;
  };

  public getPopularMoviesFromTmdb = (): void => {
    this.isLoadingTmdb = true;

    fetch(trendingMoviesUrl)
      .then(async (response) => {
        const data = await response.json();
        runInAction(() => {
          this.popularMedias = data.results;
        });
      })
      .catch((error) => {
        console.log("Fetching Error Popular Movies", error.message);
      })
      .finally(() => {
        runInAction(() => {
          this.isLoadingTmdb = false;
        });
      });
  };

  public setDataFromTmdb = async (
    searchString: string,
    searchCategory: TCategorySearch = "multi",
    activePage: number
  ): Promise<ISearch> => {
    this.isLoadingTmdb = true;
    this.searchResult = searchString;

    const data = await this.fetchJsonFromTmdb(
      searchString,
      activePage,
      searchCategory
    );
    runInAction(() => {
      this.searchTotalResults = data.total_results;
      this.searchedMedias = data.results;
      this.isLoadingTmdb = false;
    });

    return data;
  };

  public fetchJsonFromTmdb = async (
    movieName: string,
    pageNumber: number = 1,
    searchCategory: TCategorySearch
  ): Promise<ISearch> => {
    const response = await fetch(
      searchUrl(searchCategory, movieName, pageNumber)
    );
    let data = await response.json();
    console.log("data from Tmdb", data);
    // this.searchedMedias = data.results;
    return data;
  };

  public getSelectedMediaOrPerson = async (
    object: any,
    searchCategory: TCategory
  ): Promise<void> => {
    if (searchCategory === "movie") {
      await this.getAllDataForMovie(object, "movie");
    } else if (searchCategory === "tv") {
      await this.getAllDataForTv(object, "tv");
    } else {
      await this.getAllDataForPerson(object);
    }
  };

  private defaultUserSelection = (): IUserSelections => {
    return {
      [this.globalStore.userData?.userId || ""]: {
        happyEnd_Voting: null,
        haveSeen: false,
      },
    };
  };

  //-------------------------------Movie Fetches--------------------------------------------------------------
  // Collecting all Data from Movie
  public getAllDataForMovie = async (
    id: number,
    searchCategory: TCategoryMedia = "movie"
  ): Promise<IMovieAllInfos> => {
    console.log("getAllDataForMovie tmdb", id, searchCategory);
    const details: IMovieDetails =
      await TmdbStore.getDetailWatchInfos<IMovieDetails>(id, "movie");
    const images: IImagesWatchFetching =
      await TmdbStore.getImagesFromTmdb<IImagesWatchFetching>(id, "movie");
    const fsk: number = await TmdbStore.getGermanFSKFromDetails(
      details,
      "movie"
    );
    const defaultUserSelection = this.defaultUserSelection();
    const castAndCrew: (ICastMovie | ICrewMovie)[] =
      await this.getCastAndCrewFromMedia<ICastMovie | ICrewMovie>(id, "movie");
    const cast: ICastMovie[] = await TmdbStore.getCastFromMedia<ICastMovie>(
      id,
      "movie"
    );
    const directors: ICrewMovie[] =
      await TmdbStore.getDirectorFromMovie<ICrewMovie>(id);

    const completeMovieInfo: IMovieAllInfos = {
      ...details,
      images,
      category: searchCategory,
      fsk,
      userSelections: defaultUserSelection,
      has_happy_end: null,
      castAndCrew,
      cast,
      directors,
    };
    console.log("selectedMovie:", completeMovieInfo);
    return completeMovieInfo;
  };

  //Get Details infos from Movie
  private static async getDetailWatchInfos<T>(
    id: number,
    categoryWatch: TCategoryMedia
  ): Promise<T> {
    const response = await fetch(watchDetailsUrl(categoryWatch, id));
    return await response.json();
  }

  //Get Images from Movie
  private static async getImagesFromTmdb<T>(
    id: number,
    category: TCategory
  ): Promise<T> {
    const response = await fetch(imagesUrl(category, id));
    return await response.json();
  }

  //Get German FSK from Detail Infos
  private static async getGermanFSKFromDetails(
    detailsObject: any,
    category: TCategoryMedia
  ): Promise<number> {
    if (category === "movie") {
      const releaseGerman = detailsObject.releases.countries.find(
        (country: any) => country.iso_3166_1 === "DE"
      );
      if (!!releaseGerman) return +releaseGerman.certification;
      else return 400;
    } else if (category === "tv") {
      const ratingsGerman = detailsObject.content_ratings.results.find(
        (country: any) => country.iso_3166_1 === "DE"
      );
      if (!!ratingsGerman) return +ratingsGerman.rating;
      else return 400;
    } else return 500;
  }

  //Calculate has_happy_end by counting happyEnd_Voting TODO Move to database-store
  private calculateHappyEnd(movie: any): THasHappyEnd {
    let happyCount = 0;

    if (movie.userSelections) {
      Object.keys(movie.userSelections).forEach((user) => {
        if (movie.userSelections[user].happyEnd_Voting === EHasHappyEnd.TRUE)
          happyCount++;
        if (movie.userSelections[user].happyEnd_Voting === EHasHappyEnd.FALSE)
          happyCount--;
      });
    }
    if (happyCount >= 1) return EHasHappyEnd.TRUE;
    if (happyCount <= -1) return EHasHappyEnd.FALSE;
    else return EHasHappyEnd.NEUTRAL;
  }

  private getCastAndCrewFromMedia = async <T>(
    id: number,
    searchCategory: TCategoryMedia
  ): Promise<T[]> => {
    const castUrlMovie = castUrl(searchCategory, id);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    const directors = await TmdbStore.getDirectorFromMovie<ICrewMovie>(id);
    return [...directors, ...data.cast];
  };

  private static async getCastFromMedia<T>(
    id: number,
    searchCategory: TCategoryMedia
  ): Promise<T[]> {
    const castUrlMovie = castUrl(searchCategory, id);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    return data.cast;
  }

  private static async getDirectorFromMovie<T>(movieId: number): Promise<T[]> {
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
  }

  //-----------------------------------TV Show fetches ---------------------------------------------
  public getAllDataForTv = async (
    id: number,
    searchCategory: TCategoryMedia
  ): Promise<ITvAllInfos> => {
    const details: ITvDetails = await TmdbStore.getDetailWatchInfos<ITvDetails>(
      id,
      "tv"
    );
    const images: IImagesWatchFetching =
      await TmdbStore.getImagesFromTmdb<IImagesWatchFetching>(id, "tv");
    const fsk: number = await TmdbStore.getGermanFSKFromDetails(details, "tv");
    const defaultUserSelection = this.defaultUserSelection();
    const castAndCrew: (ICastTv | ICrewTv)[] =
      await this.getCastAndCrewFromMedia<ICastTv | ICrewTv>(id, "tv");
    const cast: ICastTv[] = await TmdbStore.getCastFromMedia<ICastTv>(id, "tv");
    const directors: ICrewTv[] = await TmdbStore.getDirectorFromTv(id);

    const completeTvInfo: ITvAllInfos = {
      ...details,
      images,
      category: searchCategory,
      fsk,
      userSelections: defaultUserSelection,
      has_happy_end: null,
      castAndCrew,
      cast,
      directors,
    };
    console.log("selectedTv:", completeTvInfo);
    return completeTvInfo;
  };

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
  }

  //-------------------------------------Person fetches---------------------------------------------
  // Collecting all Data from Person
  public getAllDataForPerson = async (object: any): Promise<IPersonAllData> => {
    const personKnownFor: IPersonSearch =
      await TmdbStore.getInfosForPersonFromApi(object.name);
    const personDetails: IPersonFetching =
      await TmdbStore.getDetailPersonInfosFromApi(object.id);
    return { ...object, ...personKnownFor, ...personDetails };
  };

  //Get known_for movies and other infos from person
  private static async getInfosForPersonFromApi(
    name: string
  ): Promise<IPersonSearch> {
    const response = await fetch(searchUrl("person", name, 1));
    const data = await response.json();
    return await data.results[0];
  }

  //Get Biography, Birthday and other detailed infos and Images from person
  private static async getDetailPersonInfosFromApi(
    personId: number
  ): Promise<IPersonFetching> {
    const response = await fetch(personDetailUrl(personId));
    return await response.json();
  }
}

const tmdbStore: ITmdbStoreInterface = new TmdbStore();
export default tmdbStore;
