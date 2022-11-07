import {computed, makeAutoObservable} from "mobx";
import {emptyMovie, emptyPerson, emptyTvShow} from "../../constants";
import {IMovieAllInfos} from "../../models/interfaces/movie-interfaces";
import {ITvAllInfos} from "../../models/interfaces/tv-interfaces";
import {IPersonAllData} from "../../models/interfaces/person-interfaces";
import tmdbStore from "../tmdb-store";
import databaseStore from "../database-store";
import {TCategory, THasHappyEnd} from "../../models/types";


class DetailsStore {
  selectedMovie: IMovieAllInfos | null = null; //emptyMovie;

  selectedTv: ITvAllInfos = emptyTvShow;

  selectedPerson: IPersonAllData = emptyPerson;

  tmdbStore = tmdbStore;

  databaseStore = databaseStore;

  haveSeen: boolean = false;

  hasHappyEnd: THasHappyEnd = "neutral";

  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  //
  // get isLoading(): boolean {
  //   if (!!this.selectedMovie) return false
  //   else return true
  // }

  public setSelectedMediaOrPersonForDetails = async (object: any, searchCategory: TCategory): Promise<void> => {
    this.isLoading = true;
    if (searchCategory === "movie") {
      const selectMovie = await this.tmdbStore.getAllDataForMovie(object, "movie")
      this.selectedMovie = await selectMovie
      localStorage.setItem("selectedMovie", JSON.stringify(this.selectedMovie))
    } else if (searchCategory === "tv") {
      const selectTv = await this.tmdbStore.getAllDataForTv(object, "tv")
      this.selectedTv = await selectTv
      localStorage.setItem("selectedTv", JSON.stringify(this.selectedTv))
    } else {
      const selectPerson = await this.tmdbStore.getAllDataForPerson(object)
      this.selectedPerson = await selectPerson
      localStorage.setItem("selectedPerson", JSON.stringify(this.selectedPerson))
    }
    this.isLoading = false
  };

}

const detailsStore = new DetailsStore();
export default detailsStore;