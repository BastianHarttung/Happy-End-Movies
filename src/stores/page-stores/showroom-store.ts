import { makeAutoObservable, runInAction } from "mobx";
import databaseStore from "../database-store";
import paginationStore from "../pagination-store";
import filterFormStore from "../filter-form-store";
import {
  TCategoryFilter,
  TCategoryMedia,
  TCategorySearch,
  THappyEndFilter,
} from "../../models/types";
import { EHappyEndFilter, EHasHappyEnd } from "../../models/enums";
import { IMovieAllInfos } from "../../models/interfaces/movie-interfaces";
import { ITvAllInfos } from "../../models/interfaces/tv-interfaces";

class ShowroomStore {
  sidebarOpen: boolean = false;

  filteredMedias: (IMovieAllInfos | ITvAllInfos)[] = [];

  filteredDbLength: number = 0;

  filterActive: boolean = false;

  databaseStore = databaseStore;

  paginationStore = paginationStore;

  filterFormStore = filterFormStore; // TODO

  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    this.initialLoadMovies();
  }

  initialLoadMovies = () => {
    this.isLoading = true;
    this.databaseStore.loadMoviesFromDbAndSetStates().then(() => {
      runInAction(() => {
        this.filteredMedias = this.databaseStore.dbMedias;
        this.filteredDbLength = this.databaseStore.dbLength;
        this.isLoading = false;
      });
    });
  };

  searchMovieDb = (
    movieName: string,
    searchCategory: TCategorySearch | undefined
  ) => {
    if (movieName.length === 0) {
      this.filteredMedias = this.databaseStore.dbMedias;
      this.filteredDbLength = this.databaseStore.dbMedias.length;
      window.location.hash = "";
    } else {
      window.location.hash = movieName;
      this.filterMoviesByName(movieName, searchCategory as TCategoryMedia);
    }
  };

  /**
   * Filter Movies with search
   * @param {string} movieName
   * @param {string} searchCategory eg 'movie' || 'tv'
   */
  private filterMoviesByName(
    movieName: string,
    searchCategory: TCategoryMedia
  ): void {
    const movieFilter = this.databaseStore.dbMedias.filter((movie) => {
      return "title" in movie
        ? movie.title.toLowerCase().includes(movieName.toLowerCase())
        : movie.original_name.toLowerCase().includes(movieName.toLowerCase());
    });
    this.filteredMedias = movieFilter;
    this.filteredDbLength = movieFilter.length;
  }

  /**
   * Filter Database by Arguments
   * @param {array } movies
   * @param {string} category
   * @param {string} happyEnd
   * @param {number} fskPosAge fsk Age
   */
  filterDatabase = (
    movies: any[],
    category: TCategoryFilter,
    happyEnd: THappyEndFilter,
    fskPosAge: number
  ) => {
    console.log("filterDatabase", movies, category, happyEnd, fskPosAge);
    if (
      category !== "allCategories" ||
      happyEnd !== EHappyEndFilter.ALL_ENDS ||
      fskPosAge < 18
    ) {
      const filteredByCategory = this.filterMoviesByCategory(movies, category);
      //console.log(filteredByCategory)
      const filteredByCategoryAndHappyEnd = this.filterMoviesByHappyEnd(
        filteredByCategory,
        happyEnd
      );
      //console.log(filteredByCategoryAndHappyEnd)
      const filtered = this.filterMoviesByFsk(
        filteredByCategoryAndHappyEnd,
        fskPosAge
      );
      console.log(filtered);
      this.filteredMedias = filtered;
      this.filteredDbLength = filtered.length;
      // this.paginationStore.setActivePage(0); //TODO set page
      this.filterActive = true;
    } else {
      console.log("ungefiltert");
      this.filteredMedias = movies;
      this.filteredDbLength = movies.length;
      this.filterActive = false;
    }
  };

  /**
   * Filter Movies by Category
   * @param {array} movies movies
   * @param { string } category 'movie' || 'tv'
   * @return {array} filtered movies
   */
  private filterMoviesByCategory(movies: any[], category: TCategoryFilter) {
    if (category !== "allCategories") {
      console.log("filterCategory", category);
      return movies.filter((movie) => movie.category === category);
    } else return movies;
  }

  // Filter Movies with or without HappyEnd
  private filterMoviesByHappyEnd(movies: any[], hasHappyEnd: THappyEndFilter) {
    if (
      hasHappyEnd === EHasHappyEnd.TRUE ||
      hasHappyEnd === EHasHappyEnd.FALSE
    ) {
      console.log("filterHappyEnd", hasHappyEnd);
      return movies.filter((movie) => movie.has_happy_end === hasHappyEnd);
    } else return movies;
  }

  // Filter Movies by Fsk rating
  private filterMoviesByFsk(movies: any[], fskPosAge: number) {
    if (fskPosAge < 18) {
      console.log("filterFsk", fskPosAge);
      return movies.filter((movie) => movie.fsk <= fskPosAge);
    } else return movies;
  }
}

const showroomStore = new ShowroomStore();
export default showroomStore;
