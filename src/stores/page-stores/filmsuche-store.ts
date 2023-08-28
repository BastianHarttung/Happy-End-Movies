import { makeAutoObservable } from "mobx";
import tmdbStore from "../tmdb-store";
import paginationStore from "../pagination-store";
import { TCategorySearch } from "../../models/types";
import { IFilmsucheStoreInterface } from "../../models/interfaces/stores-interfaces/filmsuche-store-interface";

class FilmsucheStore {
  searchStarted: boolean = false;
  searchCategory: TCategorySearch = "multi";

  tmdbStore = tmdbStore;

  paginationStore = paginationStore;

  constructor() {
    makeAutoObservable(this);
  }

  public setSearchCategory = (selectedSearchCategory: TCategorySearch) => {
    this.searchCategory = selectedSearchCategory;
  };

  // Search Movie after clicking the "Search" Button
  public searchingOnTmdb = async (
    searchString: string,
    searchCategory: TCategorySearch = "multi"
  ): Promise<void> => {
    if (searchString.length > 0) {
      this.searchStarted = true;
      this.searchCategory = searchCategory;
      this.tmdbStore
        .setDataFromTmdb(
          searchString,
          searchCategory,
          this.paginationStore.activePage
        )
        .then((response) => {
          this.paginationStore.setPagesArray(response.total_pages);
          window.location.hash = searchString;
        });
    } else {
      this.resetSearch();
    }
  };

  private resetSearch = () => {
    this.searchStarted = false;
    this.tmdbStore.resetTmdbStore();
    this.paginationStore.resetPagination();
    window.location.hash = "";
  };
}

const filmsucheStore: IFilmsucheStoreInterface = new FilmsucheStore();
export default filmsucheStore;
