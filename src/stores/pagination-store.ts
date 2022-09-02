import {makeAutoObservable} from "mobx";
import {IPaginationStoreInterface} from "../models/interfaces/stores-interfaces/pagination-store-interface";

class PaginationStore<IPaginationStoreInterface> {
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

const paginationStore: IPaginationStoreInterface = new PaginationStore();
export default paginationStore;