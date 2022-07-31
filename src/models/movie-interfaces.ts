//Movies
import {TCategoryWatch, TDepartment, TGender, THasHappyEnd, TJob, TKnownForDepartment} from "./types";
import {
  IImagesWatchFetching,
  IMediaBaseDetails,
  IUserSelections,
} from "./interfaces";

export interface IMovieAllInfos extends IMovieUserInfos, IMovieDetails, IMovieFetchedInfos, IMovieSearch {
}

export interface IMovieUserInfos {
  name: string,
  original_name: string,
  profile_path: string,             //Image path
  images: IImagesWatchFetching,
  category: TCategoryWatch,
  fsk: number,
  userSelections: IUserSelections,
  has_happy_end: THasHappyEnd,
  castAndCrew: (ICastMovie | ICrewMovie)[],
  cast: ICastMovie [],
  directors: ICrewMovie[],
}

export interface IMovieFetchedInfos {
  images: IImagesWatchFetching,
  category: TCategoryWatch,
  fsk: number,
  userSelections: IUserSelections,
  cast: ICastMovie[],
  directors: ICrewMovie[],
}

export interface IMovieSearch {
  "adult": boolean,
  "backdrop_path": string,
  "genre_ids": number[],
  "id": number,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "release_date": string,
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number,
}

// Response from Tmdb for Fetching watchDetailsUrl with "movie"-category
export interface IMovieDetails extends IMediaBaseDetails {
  belongs_to_collection: IBelongsToCollection,
  budget: number,
  imdb_id: string,
  original_title: string,
  release_date: string,               //2022-02-12
  revenue: number,
  runtime: number,
  title: string,
  video: boolean,
  releases: {
    countries: IReleaseCountry []
  },
}

// Movie Sub Interfaces ----------------------------------------------


// Movie People Credits---------------------

export interface ICreditsMovieFetching {
  id: number,
  cast: ICastMovie[],
  crew: ICrewMovie[],
}

export interface ICastMovie {
  "adult": boolean,
  "gender": TGender,
  "id": number,
  "known_for_department": TKnownForDepartment | string,
  "name": string,
  "original_name": string,
  "popularity": number,
  "profile_path": string | null,
  "cast_id": number,
  "character": string,
  "credit_id": string,
  "order": number
}

export interface ICrewMovie {
  "adult": boolean,
  "gender": TGender,
  "id": number,
  "known_for_department": TKnownForDepartment | string,
  "name": string,
  "original_name": string,
  "popularity": number,
  "profile_path": string | null,
  "credit_id": string,
  "department": TDepartment | string,
  "job": TJob | string
}

// Movie Sub Interfaces-----------------------

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