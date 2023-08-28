import {TCategory, TCategoryMedia, TCategorySearch, TSearchResults} from "../../types";
import {ISearch} from "../interfaces";
import {IMovieAllInfos} from "../movie-interfaces";
import {ITvAllInfos} from "../tv-interfaces";
import {IPersonAllData} from "../person-interfaces";

export interface ITmdbStoreInterface {
  searchedMedias: TSearchResults[];
  searchResult: string;
  // searchCategory: TCategorySearch;
  searchTotalResults: number;
  popularMedias: TSearchResults[];
  isLoadingTmdb: boolean;

  resetTmdbStore(): void;

  getPopularMoviesFromTmdb(): void;

  setDataFromTmdb(searchString: string, searchCategory: TCategorySearch, activePage: number): Promise<ISearch>;

  fetchJsonFromTmdb(movieName: string, pageNumber: number, searchCategory: TCategorySearch): Promise<ISearch>;

  getSelectedMediaOrPerson(object: any, searchCategory: TCategory): Promise<void>;

  getAllDataForMovie(id: number, searchCategory: TCategoryMedia): Promise<IMovieAllInfos>;

  getAllDataForTv(id: number, searchCategory: TCategoryMedia): Promise<ITvAllInfos>

  getAllDataForPerson(id: number): Promise<IPersonAllData>;
}