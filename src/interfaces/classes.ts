import {TCategory} from "./types";
import {TCategorySearch} from "./types";

export class Movie {
  id: number;
  title: string;
  name: string;
  original_name: string;
  has_happy_end: boolean;
  category: TCategory;
  poster_path: string;
  profile_path: string;
  media_type?: TCategorySearch;

  constructor(id: number,
              title: string,
              name: string,
              original_name: string,
              has_happy_end: boolean,
              category: TCategory,
              poster_path: string,
              profile_path: string,
              media_type?: TCategorySearch) {
    this.id = id;
    this.title = title;
    this.name = name,
      this.original_name = original_name,
      this.has_happy_end = has_happy_end,
      this.category = category,
      this.media_type = media_type,
      this.poster_path = poster_path,
      this.profile_path = profile_path;

  }

}