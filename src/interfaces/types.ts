import {
  IMovieAllInfos,
  IMovieSearchMultiResult,
  IPersonSearchMultiResult,
  ITvAllInfos,
  ITvShowSearchMultiResult
} from "./interfaces";

export type TCategoryWatch = "movie" | "tv"

export type TCategory = TCategoryWatch | "person"

export type TCategorySearch = TCategory | "multi"

export type TCategoryFilter = TCategoryWatch | "allCategories"


export type THappyEndFilter = "allEnds" | "true" | "false"

export type THasHappyEnd = "neutral" | "true" | "false"

//Fetching Types
export type TGender = 0 | 1 | 2 | 3

export type TDepartment =
  | "Production"
  | "Visual Effects"
  | "Costume & Make-Up"
  | "Art"
  | "Sound"
  | "Writing"
  | "Camera"
  | "Editing"
  | "Crew"
  | "Lighting"

export type TKnownForDepartment =
  | "Acting"
  | "Directing"
  | TDepartment

export type TJob =
  "Director"
  | "Executive Producer"
  | "Producer"
  | "Production Design"
  | "Costume Design"
  | "Screenplay"
  | "Novel"
  | "Key Costumer"
  | "Sound Effects Editor"
  | "Director of Photography"
  | "Editor"
  | "Casting"
  | "Original Music Composer"
  | "Sound Designer"
  | "Sound Supervisor"
  | "Stunts"
  | "Stunt Double"
  | "Graphic Designer"

export type TWatchDatabase = IMovieAllInfos | ITvAllInfos

export type TSearchResults = IMovieSearchMultiResult | ITvShowSearchMultiResult | IPersonSearchMultiResult