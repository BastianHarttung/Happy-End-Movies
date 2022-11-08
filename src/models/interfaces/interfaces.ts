import {IMovieSearch} from "./movie-interfaces";
import {ITvShowSearch} from "./tv-interfaces";
import {IPersonSearch} from "./person-interfaces";
import {THasHappyEnd, TSearchResults} from "../types";


export interface IUser {
  userId: string,
  name: string,
  email: string,
}

export interface IUserSelections {
  [key: string]: {
    happyEnd_Voting: THasHappyEnd,
    haveSeen: boolean,
  }
}

export interface IMediaBaseSearch {
  backdrop_path: string,
  genre_ids?: number[],
  id: number,
  original_language: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number,
}

export interface IMediaBaseDetails {
  adult: boolean,
  backdrop_path: string,              //Image path
  genres: IGenre[],
  homepage: string,
  id: number,
  original_language: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: IProductionCompany [],
  production_countries: IProductionCountry [],
  spoken_languages: ISpokenLanguage [],
  status: string,                     //"Released"
  tagline: string,
  vote_average: number,               //8.4
  vote_count: number,
  "videos": {
    "results": IVideoResult []
  }
}

//---------------Multi Search--------------------------------------

export interface ISearch {
  "page": number,
  "results": TSearchResults [],
  "total_pages": number,
  "total_results": number,
}

export interface IMovieSearchMultiResult extends IMovieSearch {
  "media_type": "movie",
}

export interface ITvShowSearchMultiResult extends ITvShowSearch {
  "media_type": "tv",
}

export interface IPersonSearchMultiResult extends IPersonSearch {
  "media_type": "person",
}

// -----------------Sub Interfaces-------------------------------

// Both Movie and TV-----------------------------

// Images ----------------------------

export interface IImagesWatchFetching {
  "backdrops": IImage [],
  "id": number,
  "logos": IImage [],
  "posters": IImage []
}

export interface IImagesPersonFetching {
  id: number,
  profiles: IImage[],
}

export interface IImage {
  "aspect_ratio": number,       //4.638
  "height": number,
  "iso_639_1": string,          //"en"
  "file_path": string,
  "vote_average": number,
  "vote_count": number,
  "width": number
}

export interface IGenre {
  id: number,
  name: string,
}

export interface IProductionCompany {
  id: number,
  logo_path: string,
  name: string,
  origin_country: string,
}

export interface IProductionCountry {
  iso_3166_1: string,
  name: string,
}

export interface ISpokenLanguage {
  english_name: string,
  iso_639_1: string,
  name: string,
}

export interface IVideoResult {
  "iso_639_1": string,        // "de"
  "iso_3166_1": string,       // "DE"
  "name": string,
  "key": string,              //"G7tr7xcUCFA"
  "published_at": string,     //"2015-02-22T15:00:05.000Z"
  "site": string,             //"YouTube"
  "size": number,             //1080
  "type": string,             //"Trailer"
  "official": boolean,
  "id": string,               //"57494147c3a3682c8f000911"
}