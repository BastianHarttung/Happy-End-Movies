import { ITmdbStoreInterface } from "./tmdb-store-interface";
import { IPaginationStoreInterface } from "./pagination-store-interface";
import { TCategorySearch } from "../../types";

export interface IFilmsucheStoreInterface {
  searchStarted: boolean;
  searchCategory: TCategorySearch;

  tmdbStore: ITmdbStoreInterface;
  paginationStore: IPaginationStoreInterface;

  setSearchCategory(selectedSearchCategory: TCategorySearch): void;

  searchingOnTmdb(
    searchString: string,
    searchCategory: TCategorySearch
  ): Promise<void>;

  // resetSearch(): void;
}
