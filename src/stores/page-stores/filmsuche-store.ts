import {makeAutoObservable} from "mobx";
import tmdbStore from "../tmdb-store";
import paginationStore from "../pagination-store";
import {TCategorySearch} from "../../models/types";
import {IFilmsucheStoreInterface} from "../../models/interfaces/stores-interfaces/filmsuche-store-interface";

class FilmsucheStore {

  searchStarted: boolean = false;

  tmdbStore = tmdbStore;

  paginationStore = paginationStore;

  constructor() {
    makeAutoObservable(this)
  }

  // Search Movie by clicking the Search Button
  public searchingOnTmdb = async (searchString: string, searchCategory: TCategorySearch = "multi"): Promise<void> => {
    if (searchString.length > 0) {
      this.searchStarted = true;
      const data = await this.tmdbStore.setDataFromTmdb(searchString, searchCategory, this.paginationStore.activePage)
      this.paginationStore.setPagesArray(data.total_pages)
      window.location.hash = searchString;
    } else {
      this.resetSearch()
    }
  }

  private resetSearch = () => {
    this.searchStarted = false;
    this.tmdbStore.resetTmdbStore();
    this.paginationStore.resetPagination();
    window.location.hash = "";
  }

}

const filmsucheStore: IFilmsucheStoreInterface = new FilmsucheStore();
export default filmsucheStore;