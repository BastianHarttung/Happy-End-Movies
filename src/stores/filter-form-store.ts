import {makeAutoObservable} from "mobx";
import {TCategoryFilter, TFskAges, TGenreFilter, THappyEndFilter, THaveSeenFilter} from "../models/types";

class FilterFormStore {
  filterActive: boolean = false;

  activeFilters: string[] = [];

  searchFor: string = "";

  filterCategory: TCategoryFilter = "allCategories";
  filterHaveSeen: THaveSeenFilter = "noChoice";
  filterHappyEnd: THappyEndFilter = "allEnds";
  filterGenre: TGenreFilter = "allGenres";
  fskPosAge: TFskAges = 18;

  constructor() {
    makeAutoObservable(this)
  }

  startFiltering = () => {
    this.filterActive = true
  }

  setSearchFor = (value: string) => {
    this.searchFor = value
  }

  setFilterCategory = (value: TCategoryFilter) => {
    this.filterCategory = value;
  }

  setFilterHappyEnd = (value: THappyEndFilter) => {
    this.filterHappyEnd = value
  }

  setFskPosAge = (value: TFskAges) => {
    this.fskPosAge = value
  }

  showActiveFilters = () => {
    let activeFilters = []
    if (this.filterCategory === "movie") activeFilters.push("Filme")
  }

  clearFilters = () => {
    this.filterActive = false;
  }

}

const filterFormStore = new FilterFormStore();
export default filterFormStore;