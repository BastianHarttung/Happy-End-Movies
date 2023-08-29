import { makeAutoObservable, runInAction } from "mobx";
import { emptyPerson, emptyTvShow } from "../../constants";
import { IMovieAllInfos } from "../../models/interfaces/movie-interfaces";
import { ITvAllInfos } from "../../models/interfaces/tv-interfaces";
import { IPersonAllData } from "../../models/interfaces/person-interfaces";
import tmdbStore from "../tmdb-store";
import databaseStore from "../database-store";
import { TCategory, THasHappyEnd, TStorageKey } from "../../models/types";

class DetailsStore {
  selectedMovie: IMovieAllInfos | null = null;

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

  public setSelectedMediaOrPersonForDetails = async (
    id: number,
    searchCategory: TCategory
  ): Promise<void> => {
    this.isLoading = true;
    // TODO check first if movie is in database
    if (searchCategory === "movie") {
      const selectMovie = await this.tmdbStore.getAllDataForMovie(id, "movie");
      runInAction(() => {
        this.selectedMovie = selectMovie;
      });
      localStorage.setItem("selectedMovie", JSON.stringify(this.selectedMovie));
    } else if (searchCategory === "tv") {
      const selectTv = await this.tmdbStore.getAllDataForTv(id, "tv");
      runInAction(() => {
        this.selectedTv = selectTv;
      });
      localStorage.setItem("selectedTv", JSON.stringify(this.selectedTv));
    } else {
      const selectPerson = await this.tmdbStore.getAllDataForPerson(id);
      runInAction(() => {
        this.selectedPerson = selectPerson;
      });
      localStorage.setItem(
        "selectedPerson",
        JSON.stringify(this.selectedPerson)
      );
    }
    runInAction(() => {
      this.isLoading = false;
    });
  };

  checkLocalStorage = (storageKey: TStorageKey, paramId: number) => {
    const storage = localStorage.getItem(storageKey);
    if (storage) {
      const localStorage = JSON.parse(storage);
      if (storageKey === "selectedMovie") {
        if (localStorage.id.toString() === paramId)
          this.selectedMovie = localStorage;
      }
      if (storageKey === "selectedTv") {
        if (localStorage.id.toString() === paramId)
          this.selectedTv = localStorage;
      }
      if (storageKey === "selectedPerson") {
        if (localStorage.id.toString() === paramId)
          this.selectedPerson = localStorage;
      }
    }
  };
}

const detailsStore = new DetailsStore();
export default detailsStore;
