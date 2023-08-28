export interface IPaginationStoreInterface {
  totalResults: number,
  totalPages: number,
  activePage: number,
  pageLength: number,
  pagesArray: number[],

  resetPagination(): void,

  setActivePage(pageNumber: number): void,

  setPagesArray(totalPages: number): void,
}