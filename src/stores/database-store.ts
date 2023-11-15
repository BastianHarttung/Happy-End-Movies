import {makeAutoObservable} from "mobx";
import {IMovieAllInfos} from "../models/interfaces/movie-interfaces";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import firestoreDb from "../firebase-config";
import {ITvAllInfos} from "../models/interfaces/tv-interfaces";


class DatabaseStore {

  dbMedias: (IMovieAllInfos | ITvAllInfos)[] = [];
  dbLength: number = 0;

  isLoadingDb: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Load Movies from Database sort and set all States to this
   * @return {Promise<void>}
   */
  loadMoviesFromDbAndSetStates = async (): Promise<void> => {
    const moviesCollectionRef = collection(firestoreDb, "movies");
    const data = await getDocs(moviesCollectionRef);
    const movieDataArray = data.docs.map((doc) => ({...doc.data()}));
    console.log(movieDataArray)
    const movieArraySort = this.sortMovies(movieDataArray as (IMovieAllInfos | ITvAllInfos)[]);
    this.dbLength = movieDataArray.length;
    this.dbMedias = movieArraySort;
  }

  /**
   * Sort Movies from Database by Title
   */
  private sortMovies(moviesArray: (IMovieAllInfos | ITvAllInfos)[]): (IMovieAllInfos | ITvAllInfos)[] {
    moviesArray.sort((a, b) => {
        let aName = "";
        let bName = "";
        if ("title" in a) aName = a.title
        if ("original_name" in a) aName = a.original_name;
        if ("title" in b) bName = b.title
        if ("original_name" in b) bName = b.original_name;
        return aName < bName ? -1
          : aName > bName ? 1
            : 0
      }
    )
    return moviesArray;
  }

  //Save Movie to Database Firebase by clicking on Detailansicht Speichern
  async saveMovieToDb(movieDb: any): Promise<void> {
    try {
      const actualMoviesDoc = doc(firestoreDb, "movies/" + movieDb.id);
      await setDoc(actualMoviesDoc, movieDb);
      console.log("In Firestore Gespeichert:", movieDb);
    } catch (e) {
      console.log("Error", e);
    }
  }

}

const databaseStore = new DatabaseStore();
export default databaseStore