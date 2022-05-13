import {makeAutoObservable} from "mobx";
import {IMovieAllInfos, ITvShow} from "../interfaces/interfaces";
import {IPerson} from "../interfaces/interfaces";
import {doc, setDoc} from "firebase/firestore";
import firestoreDb from "../firebase-config";
import {
  castUrl,
  emptyMovie,
  emptyPerson,
  emptyTvShow,
  genreUrl,
  imagesUrl,
  movieDetailsUrl, personDetailUrl,
  searchUrl
} from "../constants";
import {TCategory, TCategorySearch, THasHappyEnd} from "../interfaces/types";
import globalStore from "./global-store";

const {user} = globalStore;

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

  //Get genres and fsk and has_happy_end and save to selectedMovie state
  public async saveSelectedMovieOrPerson(object: any, searchCategory: TCategory): Promise<void> {
    //console.log('App movie', object)
    //console.log('app category', searchCategory)
    if (searchCategory !== "person" && searchCategory === "movie") {
      this.setAllDataForMovie(object, "movie")
    } else {
      this.setAllDataForPerson(object)
    }
  };

  //-------------------------------Movie Fetches--------------------------------------------------------------
  // Collecting all Data from Movie
  private async setAllDataForMovie(object: any, searchCategory: TCategory): Promise<void> {
    const details = await this.getDetailMovieInfos(object.id, searchCategory);
    const images = await this.getImagesFromMovie(object.id, searchCategory);
    const genres = await this.getGenreNames(object, searchCategory);
    const fsk = await this.getGermanFSKFromDetails(details, searchCategory);
    const hasHappyEnd = await this.calculateHappyEnd(object);
    const cast = await this.getCastForMovie(object.id, searchCategory);
    const directors = await this.getDirectorForMovie(object.id, searchCategory);
    const completeMovieInfo = {
      ...object,
      ...details,
      images: images,
      category: searchCategory,
      genresD: genres,
      fsk: fsk,
      userSelections: {
        [user.userId]: {
          happyEnd_Voting: object.userSelections
            ? object.userSelections[user.userId].happyEnd_Voting
            : "",
          haveSeen: object.userSelections
            ? object.userSelections[user.userId].haveSeen
            : false,
        },
      },
      has_happy_end: hasHappyEnd,
      cast: cast,
      directors: directors,
    };
    this.selectedMovie = completeMovieInfo;
    console.log("selectedMovie:", completeMovieInfo);
  }

  //Get Details infos from Movie
  private async getDetailMovieInfos(id: number, category: TCategory): Promise<{}> {
    const response = await fetch(movieDetailsUrl(category, id));
    let data = await response.json();
    return data;
  };

  //Get Images from Movie
  private async getImagesFromMovie(id: number, category: TCategory): Promise<{}> {
    const response = await fetch(imagesUrl(category, id));
    let data = await response.json();
    return data;
  };

  //Get Genre Names and return in Array
  private async getGenreNames(movie: any, searchCategory: TCategory): Promise<string[]> {
    let genres = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      const genreName = await this.getGenreNameFromApi(
        movie.genre_ids[i],
        searchCategory,
      );
      genres.push(genreName);
    }
    return genres;
  };

  //Get Genre from TMDB API
  private async getGenreNameFromApi(genreId: number, searchCategory: TCategory): Promise<string> {
    const response = await fetch(genreUrl(searchCategory));
    let data = await response.json();
    const genre = data.genres.find((genre: any) => genre.id === genreId);
    return genre.name;
  };

  //Get German FSK from Detail Infos
  private async getGermanFSKFromDetails(detailsObject: any, category: TCategory): Promise<number> {
    if (category === "movie") {
      const releaseGerman = detailsObject.releases.countries.find(
        (country: any) => country.iso_3166_1 === "DE",
      );
      if (!!releaseGerman) return +releaseGerman.certification;
      else return 400;
    } else if (category === "tv") {
      const ratingsGerman = detailsObject.content_ratings.results.find(
        (country: any) => country.iso_3166_1 === "DE",
      );
      if (!!ratingsGerman) return +ratingsGerman.rating;
      else return 400;
    } else return 500
  };

  //Calculate has_happy_end by counting happyEnd_Voting
  private calculateHappyEnd(movie: any): THasHappyEnd {
    if (typeof movie.happyEnd_Voting === "object") {
      //console.log('calculate happyend')
      const happyEndArray = Object.values(movie.happyEnd_Voting);
      const trueCount = happyEndArray.reduce((acc: number, current) => {
        if (current) acc++;
        else if (!current) acc--;
        return acc;
      }, 0);
      if (trueCount > 0) return "true";
      else if (trueCount === 0 || movie.happyEnd_Voting === false)
        return "neutral";
      else return "false";
    } else return "neutral";
  };

  //Get Cast for Movie
  private async getCastForMovie(movieId: number, searchCategory: TCategory): Promise<{}[]> {
    const castUrlMovie = castUrl(searchCategory, movieId);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    let castArray: any[] = [];
    data.cast.forEach((actor: any) => castArray.push(actor));
    return castArray;
  };

  //Get Director for Movie
  private async getDirectorForMovie(movieId: number, searchCategory: TCategory): Promise<{}[]> {
    const castUrlMovie = castUrl(searchCategory, movieId);
    const response = await fetch(castUrlMovie);
    let data = await response.json();
    let directorArray = [];
    for (let i = 0; i < data.crew.length; i++) {
      if (data.crew[i].job === "Director") {
        directorArray.push(data.crew[i]);
      }
    }
    return directorArray;
  };

  //-------------------------------------Person fetches---------------------------------------------
  // Collecting all Data from Person
  private async setAllDataForPerson(object: any): Promise<void> {
    const personKnownFor = await this.getInfosForPersonFromApi(object.name);
    const personDetails = await this.getDetailPersonInfosFromApi(object.id);
    this.selectedPerson = {...object, ...personKnownFor, ...personDetails};
  }

  //Get known_for movies and other infos from person
  private async getInfosForPersonFromApi(name: string): Promise<{}> {
    const response = await fetch(searchUrl("person") + name);
    const data = await response.json();
    const result = await data.results[0];
    return result;
  };

  //Get Biography, Birthday and other detailed infos and Images from person
  private async getDetailPersonInfosFromApi(personId: number): Promise<{}> {
    const response = await fetch(personDetailUrl(personId));
    let data = await response.json();
    return data;
  };

}


const apiStore = new ApiStore();
export default apiStore;