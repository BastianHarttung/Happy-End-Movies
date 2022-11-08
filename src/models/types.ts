import {
  IMovieSearchMultiResult,
  IPersonSearchMultiResult,
  ITvShowSearchMultiResult
} from "./interfaces/interfaces";
import {IMovieAllInfos} from "./interfaces/movie-interfaces";
import {ITvAllInfos} from "./interfaces/tv-interfaces";


export type TCategoryMedia = "movie" | "tv"
export type TCategory = TCategoryMedia | "person"
export type TCategorySearch = TCategory | "multi"

export type THasHappyEnd = "neutral" | "true" | "false"

export type TFskAges = 0 | 6 | 12 | 16 | 18

// Filter
export type TCategoryFilter = TCategoryMedia | "allCategories"
export type THappyEndFilter = "allEnds" | "true" | "false"
export type THaveSeenFilter = "noChoice" | "true" | "false"
export type TGenreFilter =
  "allGenres"
  | "Action"
  | "Abenteuer"
  | "Komödie"

//Fetching Types
export type TGender = 0 | 1 | 2 | 3


export type TDepartment =
  "Production"
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
  "Acting"
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

export type TUserSelections = "haveSeen" | "happyEnd_Voting"

export type TStorageKey = "selectedMovie" | "selectedTv" | "selectedPerson"