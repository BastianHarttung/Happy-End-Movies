import {ITmdbStoreInterface} from "./tmdb-store-interface";
import {IPaginationStoreInterface} from "./pagination-store-interface";
import {TCategorySearch} from "../../types";

export interface IFilmsucheStoreInterface {
  searchStarted: boolean;

  tmdbStore: ITmdbStoreInterface;
  paginationStore: IPaginationStoreInterface;

  searchingOnTmdb(searchString: string, searchCategory: TCategorySearch): Promise<void>;
  // resetSearch(): void;
}