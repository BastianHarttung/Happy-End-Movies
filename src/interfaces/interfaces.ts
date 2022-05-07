import {TCategory} from "./types";
import {TCategorySearch} from "./types";

export interface IUser {
  userId: string,
  name: string,
  email: string,
}


//Big Data---------------------------

//Movies
export interface IMovie {
  id: number,
  title: string,
  name: string,
  original_name: string,
  has_happy_end: boolean,
  category: TCategory,
  media_type?: TCategorySearch,
  poster_path: string,           //Image path
  profile_path: string,          //Image path
}

export interface IMovieDetails {
  adult: string,
  backdrop_path: string,    //Image path
  belongs_to_collection: {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string,
  },
  budget: number,
  genres: IGenre[],
  homepage: string,
  id: number,             //!!!!
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: { //TODO
    id: number,
    logo_path: string,
    name: string,
    origin_country: string,
  } [ ],
  production_countries: {  //TODO
    iso_3166_1: string,
    name: string,
  } [],
  release_date: string,     //2022-02-12
  revenue: number,
  runtime: number,
  spoken_languages: {   //TODO
    english_name: string,
    iso_639_1: string,
    name: string,
  } [  ],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  releases: {
    countries: {    //TODO
      certification: number,
      iso_3166_1: string,
      primary: boolean,
      release_date: string,     //2022-03-23
    }[    ]
  }
}

export interface ITv {

}

export interface IPerson {
  id: number,
  profile_path: string,
  gender: number,
  name: string,
  character: string,
  job: string,
  roles: { character: string }[],
}

export interface ISearch extends IMovie, ITv, IPerson {

}

// Sub Data---------------------------
export interface IImage {
  file_path: string,
}

export interface IGenre {
  id: number,
  name: string,
}
