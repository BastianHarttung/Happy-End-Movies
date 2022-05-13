import {makeAutoObservable} from "mobx";
import {IMovieAllInfos, ITvShow} from "../interfaces/interfaces";
import {IPerson} from "../interfaces/interfaces";
import {doc, setDoc} from "firebase/firestore";
import firestoreDb from "../firebase-config";
import {emptyMovie, emptyPerson, emptyTvShow} from "../constants";


class ApiStore {

  selectedMovie: IMovieAllInfos = emptyMovie;
  selectedTv: ITvShow = emptyTvShow;
  selectedPerson: IPerson = emptyPerson;

  constructor() {
    makeAutoObservable(this);
  }

  //Save Movie to Database Firebase by clicking on Detailansicht Speichern
  async saveMovieToDb(movieDb: any): Promise<void> {
    try {
      console.log("save to Firestore", movieDb);
      const actualMoviesDoc = doc(firestoreDb, "movies/" + movieDb.id);
      await setDoc(actualMoviesDoc, movieDb);
      console.log("In Firestore Gespeichert");
    } catch (e) {
      console.log("Error", e);
    }
  }

}


const apiStore = new ApiStore();
export default apiStore;