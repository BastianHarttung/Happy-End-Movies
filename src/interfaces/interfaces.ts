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

// Response from Tmdb for Fetching watchDetailsUrl with "movie"-category
export interface IMovieDetails {
  adult: boolean,
  backdrop_path: string,          //Image path
  belongs_to_collection: IBelongsToCollection,
  budget: number,
  genres: IGenre[],
  homepage: string,
  id: number,                     //!!!!
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: IProductionCompany [],
  production_countries: IProductionCountry [],
  release_date: string,         //2022-02-12
  revenue: number,
  runtime: number,
  spoken_languages: ISpokenLanguage [],
  status: string,               //"Released"
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,         //8.4
  vote_count: number,
  releases: {
    countries: IReleaseCountry []
  },
  "videos": {
    "results": IVideoResult []
  }
}

//--------------TV----------------------------------
export interface ITvAllInfos extends ITvShow, ITvDetails {
}

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

// Response from Tmdb for Fetching watchDetailsUrl with "tv"-category
export interface ITvDetails {
  "adult": boolean,
  "backdrop_path": string,        // "/n3u3kgNttY1F5Ixi5bMY9BwZImQ.jpg"
  "created_by": ICreatedBy [],
  "episode_run_time": number[],     // episode between numbers
  "first_air_date": string,         //"2022-02-21"
  "genres": IGenre [],
  "homepage": string,
  "id": number,
  "in_production": boolean,
  "languages": string[],            //"en"
  "last_air_date": string,          //"2013-09-29"
  "last_episode_to_air": ILastEpisodeToAir,
  "name": string,
  "next_episode_to_air": null,
  "networks": INetworkShort [],
  "number_of_episodes": number,
  "number_of_seasons": number,
  "origin_country": string[],         // "US"
  "original_language": string,        //"en"
  "original_name": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "production_companies": IProductionCompany [],
  "production_countries": IProductionCountry [],
  "seasons": ISeason [],
  "spoken_languages": ISpokenLanguage [],
  "status": string,                     //"Ended"
  "tagline": string,
  "type": string,                       //"Scripted"
  "vote_average": number,
  "vote_count": number,
  "videos": {
    "results": IVideoResult []
  },
  "content_ratings": {
    "results": IContentRatingsResult []
  }
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
  "roles": IRoleTvActor [],
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

// -----------------Sub Data---------------------------
export interface IImage {
  file_path: string,
}

// Both Movie and TV
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

// Movie
export interface IReleaseCountry {
  certification: string,    // "16"
  iso_3166_1: string,       // "DE"
  primary: boolean,
  release_date: string,     //2022-03-23
}

export interface IBelongsToCollection {
  id: number,
  name: string,
  poster_path: string,
  backdrop_path: string,
}

// TV
interface IContentRatingsResult {
  "iso_3166_1": string,             //"DE"
  "rating": string                  //"16"
}

interface IRoleTvActor {
  "credit_id": string,    // "52542282760ee313280017f9"
  "character": string,
  "episode_count": number
}

interface ICreatedBy {
  "id": number,
  "credit_id": string,         //"52542286760ee31328001a7b"
  "name": string,
  "gender": TGender,
  "profile_path": string
}

interface ILastEpisodeToAir {
  "air_date": string,             //"2013-09-29"
  "episode_number": number,
  "id": number,
  "name": string,                 //Episode name
  "overview": string,
  "production_code": string,
  "runtime": number,
  "season_number": number,
  "still_path": string,
  "vote_average": number,          //9.2
  "vote_count": number
}

interface ISeason {
  "air_date": string,               //"2009-02-17"
  "episode_count": number,
  "id": number,
  "name": string,                   //"Staffel 2"
  "overview": string,
  "poster_path": string,
  "season_number": number,
  networks: INetworkLong []
}

interface INetwork {
  "name": string,
  "id": number,
  "origin_country": string          //"US"
}

interface INetworkLong extends INetwork {
  "logo": INetworkLogo,
}

interface INetworkShort extends INetwork {
  "logo_path": string,
}

interface INetworkLogo {
  "path": string,
  "aspect_ratio": number          //1.768
}

// Person
export interface IRole {
  character: string
}