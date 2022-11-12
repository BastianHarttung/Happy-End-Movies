import {makeAutoObservable} from "mobx";
import {IPaginationStoreInterface} from "../models/interfaces/stores-interfaces/pagination-store-interface";

class PaginationStore {
  totalResults: number = 0;

  totalPages: number = 0;

  activePage: number = 1;

  pageLength: number = 24;

  pagesArray: number[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  public resetPagination = () => {
    this.pagesArray = []
  }

  public setActivePage = (pageNumber: number) => {
    this.activePage = pageNumber
  }

  public setPagesArray = (totalPages: number) => {
    this.pagesArray = this.makePageArray(totalPages);
  }

  // Make an Array with Pages
  public makePageArray = (numberPages: number): number[] => {
    let pageArray = [];
    for (let i = 1; i <= numberPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

}

const paginationStore: IPaginationStoreInterface = new PaginationStore();
export default paginationStore;