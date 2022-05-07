import {makeAutoObservable} from "mobx";
import {IMovie} from "../interfaces/interfaces";
import {IPerson} from "../interfaces/interfaces";

class ApiStore {

  selectedMovie: IMovie = {};
  selectedPerson: IPerson = {};

  constructor() {
    makeAutoObservable(this);
  }
}