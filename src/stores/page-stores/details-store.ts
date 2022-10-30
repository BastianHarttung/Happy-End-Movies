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

  constructor() {
    makeAutoObservable(this, {isLoading: computed});
  }

  get isLoading(): boolean {
    console.log(this.selectedMovie)
    if (!!this.selectedMovie) return false
    else return true
  }

  public setSelectedMediaOrPersonForDetails = async (object: any, searchCategory: TCategory): Promise<void> => {
    if (searchCategory === "movie") {
      this.selectedMovie = await this.tmdbStore.setAllDataForMovie(object, "movie")
    } else if (searchCategory === "tv") {
      this.selectedTv = await this.tmdbStore.setAllDataForTv(object, "tv")
    } else {
      this.selectedPerson = await this.tmdbStore.setAllDataForPerson(object)
    }
  };

}

const detailsStore = new DetailsStore();
export default detailsStore;