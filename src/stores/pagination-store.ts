import {makeAutoObservable} from "mobx";

class PaginationStore {
  totalResults: number = 0;

  totalPages: number = 0;

  activePage: number = 1;

  pageLength: number = 24;

  pagesArray: number[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  setActivePage = (pageNumber: number) => {
    this.activePage = pageNumber
  }

}

const paginationStore = new PaginationStore();
export default paginationStore;