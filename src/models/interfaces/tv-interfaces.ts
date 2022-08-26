import {TCategoryMedia, TGender, THasHappyEnd, TJob, TKnownForDepartment} from "../types";
import {
  IImagesWatchFetching,
  IMediaBaseDetails, IMediaBaseSearch,
} from "./interfaces";


export interface ITvAllInfos extends ITvFetchedUserInfos, ITvShowSearch, ITvDetails {
}

export interface ITvFetchedUserInfos {
  images: IImagesWatchFetching,
  category: TCategoryMedia,
  fsk: number,
  userSelections: {
    [key: string]: {
      happyEnd_Voting: THasHappyEnd,
      haveSeen: boolean,
    },
  },
  has_happy_end: THasHappyEnd,
  castAndCrew: (ICastTv | ICrewTv)[],
  cast: ICastTv [],
  directors: ICrewTv[],
}

// Coming from TMDB
export interface ITvShowSearch extends IMediaBaseSearch{
  first_air_date: string,       //2022-02-23
  name: string,
  origin_country: string[],
  original_name: string,
}

// Response from Tmdb for Fetching watchDetailsUrl with "tv"-category
export interface ITvDetails extends IMediaBaseDetails {
  created_by: ICreatedBy [],
  episode_run_time: number[],     // episode between numbers
  first_air_date: string,         //"2022-02-21"
  in_production: boolean,
  languages: string[],            //"en"
  last_air_date: string,          //"2013-09-29"
  last_episode_to_air: ILastEpisodeToAir,
  name: string,
  next_episode_to_air: null,
  networks: INetworkShort [],
  number_of_episodes: number,
  number_of_seasons: number,
  origin_country: string[],         // "US"
  original_name: string,
  seasons: ISeason [],
  type: string,                       //"Scripted"
  content_ratings: {
    results: IContentRatingsResult []
  }
}

// TV Sub Interfaces -----------------------------------------------------

// TV People Credits------------------------------

export interface ICreditsTvFetching {
  id: number,
  cast: ICastTv[],
  crew: ICrewTv[],
}

export interface ICastTv {
  "adult": boolean,
  "gender": TGender,                 // 1 | 2 | 0
  "id": number,
  "known_for_department": string,     // "Acting"
  "name": string,
  "original_name": string,
  "popularity": number,               // 8.432
  "profile_path": string | null,
  "roles": IRoleTvActor [],
  "total_episode_count": number,
  "order": number
}

export interface ICrewTv {
  "adult": boolean,
  "gender": TGender,
  "id": number,
  "known_for_department": TKnownForDepartment,
  "name": string,
  "original_name": string,
  "popularity": number,
  "profile_path": string | null,
  "jobs": ICrewTvJobs [],
  "department": TKnownForDepartment,
  "total_episode_count": number,
}

// TV Sub Interfaces--------------------------------

interface ICrewTvJobs {
  "credit_id": string,
  "job": TJob | string,
  "episode_count": number
}

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

