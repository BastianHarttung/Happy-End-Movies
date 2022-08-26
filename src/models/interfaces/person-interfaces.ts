//---------------------Person----------------------

import {TCategory, TGender, TKnownForDepartment} from "../types";
import {IImage} from "./interfaces";

export interface IPersonAllData extends IPersonSearch, IPersonFetching {
}

export interface IPerson {
  id: number,
  profile_path: string,
  gender: number,
  name: string,
  character: string,
  job: string,
  roles: IRole[],
}

export interface IPersonSearch {
  "adult": boolean,
  "gender": TGender,
  "id": number,
  "known_for": IPersonSearchKnownFor[],
  "known_for_department": TKnownForDepartment,
  "name": string,
  "popularity": number,
  "profile_path": string,
}

export interface IPersonSearchKnownFor {
  "adult": boolean,
  "backdrop_path": string,
  "genre_ids": number[],
  "id": number,
  "media_type": TCategory,        //!!!!!!!!!!!!!
  "original_language": string,
  "original_title": string,
  "overview": string,
  "poster_path": string,
  "release_date": string,         //"1999-09-12"
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number,
}

export interface IPersonFetching {
  "adult": boolean,
  "also_known_as": string[],
  "biography": string,
  "birthday": string,             //"1956-03-07"
  "deathday": string | null,
  "gender": TGender,
  "homepage": string | null,
  "id": number,
  "imdb_id": string,
  "known_for_department": TKnownForDepartment,
  "name": string,
  "place_of_birth": string,
  "popularity": number,
  "profile_path": string,
  "images": {
    "profiles": IImage[]
  }
}

// Person Sub Interfaces --------------------------------------

interface IRole {
  character: string
}