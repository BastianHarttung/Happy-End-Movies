export interface IPaginationStoreInterface {
  totalResults: number,
  totalPages: number,
  activePage: number,
  pageLength: number,
  pagesArray: number[],

  setActivePage: (pageNumber: number) => void,
  makePageArray: (numberPages: number) => number[],
}