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

  getSelectedMediaOrPerson: (object: any, searchCategory: TCategory) => Promise<void>;
  getAllDataForMovie: (object: any, searchCategory: TCategoryMedia) => Promise<IMovieAllInfos>;
  getAllDataForTv: (object: any, searchCategory: TCategoryMedia) => Promise<ITvAllInfos>
  getAllDataForPerson: (object: any) => Promise<IPersonAllData>;
}