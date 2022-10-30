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
  public searchingTmdb = async (searchString: string, searchCategory: TCategorySearch = "multi"): Promise<void> => {
    this.tmdbStore.searchCategory = searchCategory;
    if (searchString.length > 0) {
      this.searchStarted = true;
      this.tmdbStore.searchResult = searchString;
      this.tmdbStore.isLoadingTmdb = true;
      const tmdbData = await this.tmdbStore.getJsonFromTmdb(searchString, this.paginationStore.activePage, searchCategory);
      this.tmdbStore.searchTotalResults = tmdbData.total_results;
      this.paginationStore.pagesArray = this.paginationStore.makePageArray(tmdbData.total_pages);
      this.tmdbStore.searchedMedias = tmdbData.results;
      this.tmdbStore.isLoadingTmdb = false;
      window.location.hash = searchString;
    } else {
      this.resetSearch()
    }
  }

  private resetSearch = () => {
    this.searchStarted = false;
    this.tmdbStore.searchResult = "";
    this.tmdbStore.searchTotalResults = 0;
    this.paginationStore.pagesArray = [];
    this.tmdbStore.searchedMedias = [];
    this.tmdbStore.isLoadingTmdb = false;
    window.location.hash = "";
  }

}

const filmsucheStore: IFilmsucheStoreInterface = new FilmsucheStore();
export default filmsucheStore;