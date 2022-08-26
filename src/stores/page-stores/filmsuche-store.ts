import {makeAutoObservable} from "mobx";
import tmdbStore from "../tmdb-store";
import paginationStore from "../pagination-store";

class FilmsucheStore {

  tmdbStore = tmdbStore;

  paginationStore = paginationStore;

  constructor() {
    makeAutoObservable(this)
  }

}

const filmsucheStore = new FilmsucheStore();
export default filmsucheStore;