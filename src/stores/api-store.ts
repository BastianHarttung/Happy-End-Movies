import {makeAutoObservable} from "mobx";
import {IMovie} from "../interfaces/interfaces";
import {IPerson} from "../interfaces/interfaces";

const emptyMovie = {
  id: 0,
  title: "",
  name: "",
  original_name: "",
  has_happy_end: false,
  // category: "movie",
  // media_type: "movie",
  poster_path: "",
  profile_path: "",
}

const emptyPerson = {
  id: 0,
  profile_path: "",
  gender: 0,
  name: "",
  character: "",
  job: "",
  roles: [{character: ""}],
}

class ApiStore {

  selectedMovie: IMovie = emptyMovie;
  selectedPerson: IPerson = emptyPerson;

  constructor() {
    makeAutoObservable(this);
  }
}