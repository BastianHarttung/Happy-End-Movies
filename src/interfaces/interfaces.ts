import {TCategory, TGender} from "./types";
import {TCategorySearch} from "./types";

export interface IUser {
  userId: string,
  name: string,
  email: string,
}


//Big Data---------------------------

//Movies
export interface IMovieAllInfos extends IMovie, IMovieDetails {

}

export interface IMovie {
  id: number,
  title: string,
  name: string,
  original_name: string,
  has_happy_end: boolean,
  category?: TCategory,
  media_type?: TCategorySearch,
  poster_path: string,           //Image path
  profile_path: string,          //Image path
}

export interface IMovieDetails {
  adult: boolean,
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
      certification: string,
      iso_3166_1: string,
      primary: boolean,
      release_date: string,     //2022-03-23
    }[    ]
  }
}

//--------------TV----------------------------------

// Coming from TMDB
export interface ITvShow {
  "backdrop_path": string,
  "first_air_date": string,   //2022-02-23
  "genre_ids": number[],
  "id": number,
  "name": string,
  "origin_country": string[],
  "original_language": string,
  "original_name": string,
  "overview": string,
  "popularity": number,       //200.000
  "poster_path": string,
  "vote_average": number,     //8.7
  "vote_count": number,       //8000
}

export interface ITvActor {
  "adult": boolean,
  "gender": TGender,                 // 1 | 2 | 0
  "id": number,
  "known_for_department": string,     // "Acting"
  "name": string,
  "original_name": string,
  "popularity": number,               // 8.432
  "profile_path": string,
  "roles": [
    {
      "credit_id": string,    // "52542282760ee313280017f9"
      "character": string,
      "episode_count": number
    }
  ],
  "total_episode_count": number,
  "order": number
}

//---------------------Person----------------------

export interface IPerson {
  id: number,
  profile_path: string,
  gender: number,
  name: string,
  character: string,
  job: string,
  roles: IRole[],
}

export interface ISearch extends IMovie, ITvShow, IPerson {

}

// Sub Data---------------------------
export interface IImage {
  file_path: string,
}

export interface IGenre {
  id: number,
  name: string,
}

export interface IRole {
  character: string
}
