import {makeAutoObservable} from "mobx";

class PaginationStore {
  totalResults: number = 0;

  totalPages: number = 0;

  activePage: number = 1;

  pageLength: number = 24;

  pages: number[] = [];

  constructor() {
    makeAutoObservable(this)
  }

}

const paginationStore = new PaginationStore();
export default paginationStore;