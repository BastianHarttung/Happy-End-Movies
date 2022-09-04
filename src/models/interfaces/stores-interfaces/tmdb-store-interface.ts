import {TCategory, TCategoryMedia, TCategorySearch, TSearchResults} from "../../types";
import {ISearch} from "../interfaces";
import {IMovieAllInfos} from "../movie-interfaces";
import {ITvAllInfos} from "../tv-interfaces";
import {IPersonAllData} from "../person-interfaces";

export interface ITmdbStoreInterface {
  searchedMedias: TSearchResults[];
  searchResult: string;
  searchCategory: TCategorySearch;
  searchTotalResults: number;
  popularMedias: TSearchResults[];
  isLoadingTmdb: boolean;

  getPopularMoviesFromTmdb: () => void;
  getJsonFromTmdb: (movieName: string, pageNumber: number, searchCategory: TCategorySearch) => Promise<ISearch>;

  saveSelectedMovieOrPerson: (object: any, searchCategory: TCategory) => Promise<void>;
  setAllDataForMovie: (object: any, searchCategory: TCategoryMedia) => Promise<IMovieAllInfos>;
  setAllDataForTv: (object: any, searchCategory: TCategoryMedia) => Promise<ITvAllInfos>
  setAllDataForPerson: (object: any) => Promise<IPersonAllData>;
}