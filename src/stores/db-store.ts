import {makeAutoObservable} from "mobx";
import {IMovieAllInfos} from "../interfaces/interfaces";

class DbStore {

  dbMovies: IMovieAllInfos[] = [];
  dbLength: number = 0;
  filteredMovies: IMovieAllInfos[] = [];
  filteredDbLength: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

}


const dbStore = new DbStore();
export default dbStore;