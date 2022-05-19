import {TCategory, TCategorySearch, TCategoryWatch, THasHappyEnd} from "./interfaces/types";
import {
  ICast, ICrew,
  IGenre, IImage, IImagesWatchFetching,
  IMovieAllInfos,
  IPerson,
  IProductionCompany, IProductionCountry, ISpokenLanguage,
  ITvAllInfos,
  ITvShow,
  IVideoResult
} from "./interfaces/interfaces";

//----------Empty Objects-------------------------------------------
export const emptyMovie: IMovieAllInfos = {
  id: 0,
  title: "",
  name: "",
  original_name: "",
  has_happy_end: "neutral",
  category: "movie",
  media_type: undefined,
  poster_path: "",
  profile_path: "",
  adult: false,
  backdrop_path: "",    //Image path
  belongs_to_collection: {
    id: 0,
    name: "",
    poster_path: "",
    backdrop_path: "",
  },
  budget: 0,
  genres: [],
  homepage: "",
  imdb_id: "",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  production_companies: [],
  production_countries: [],
  release_date: "",
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: "",
  tagline: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
  releases: {
    countries: []
  },
  videos: {
    results: []
  },
  images: {
    backdrops: [],
    id: 0,
    logos: [],
    posters: []
  },
  fsk: 400,
  userSelections: {
    [""]: {
      happyEnd_Voting: "neutral",
      haveSeen: false,
    },
  },
  cast: [],
  directors: [],
}

export const emptyTvShow: ITvAllInfos = {
  backdrop_path: "",
  first_air_date: "",
  genre_ids: [],
  id: 0,
  name: "",
  origin_country: [],
  original_language: "",
  original_name: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  vote_average: 0,
  vote_count: 0,
  adult: false,
  created_by: [],
  episode_run_time: [],
  genres: [],
  homepage: "",
  in_production: false,
  languages: [],
  last_air_date: "",
  last_episode_to_air: {
    air_date: "",
    episode_number: 0,
    id: 0,
    name: "",
    overview: "",
    production_code: "",
    runtime: 0,
    season_number: 0,
    still_path: "",
    vote_average: 0,
    vote_count: 0
  },
  next_episode_to_air: null,
  networks: [],
  number_of_episodes: 0,
  number_of_seasons: 0,
  production_companies: [],
  production_countries: [],
  seasons: [],
  spoken_languages: [],
  status: "",
  tagline: "",
  type: "",
  videos: {
    results: []
  },
  content_ratings: {
    results: []
  }
}

export const emptyPerson: IPerson = {
  id: 0,
  profile_path: "",
  gender: 0,
  name: "",
  character: "",
  job: "",
  roles: [{character: ""}],
}

const k = process.env.REACT_APP_API_KEY_TMDB;

//---------------URLs from TMDB API-------------------------------------

const BaseUrl = `https://api.themoviedb.org/3`

//What are you searching for? Movie, TV-Show, Person, all Things (Multi)
export const searchUrl = (searchFor: TCategorySearch, title: string, pageNumber: number): string => `${BaseUrl}/search/${searchFor}?api_key=${k}&language=de&include_adult=false&query=${title}&page=${pageNumber}`;
export const popularMoviesUrl: string = `${BaseUrl}/movie/popular?api_key=${k}&language=de&page=1`;
export const trendingMoviesUrl: string = `${BaseUrl}/trending/all/day?api_key=${k}`;

//searchFor = {string} 'movie' || 'tv'
export const genreUrl = (searchFor: TCategoryWatch): string => `${BaseUrl}/genre/${searchFor}/list?api_key=${k}&language=de`;
// export const fskUrl: string = `https://altersfreigaben.de/api2/s/`;
export const watchDetailsUrl = (movieOrTv: TCategoryWatch, tmdbId: number): string => `${BaseUrl}/${movieOrTv}/${tmdbId}?api_key=${k}&language=de&append_to_response=releases,videos,content_ratings`;

export const imagesUrl = (category: TCategory, tmdbId: number): string => `${BaseUrl}/${category}/${tmdbId}/images?api_key=${k}`;
export const imageUrlBig = `https://image.tmdb.org/t/p/w500`;
export const imageUrlSmall = `https://image.tmdb.org/t/p/w200`;

export const castUrl = (movieOrTv: TCategoryWatch, id: number): string => {
  if (movieOrTv === "tv") {
    return `${BaseUrl}/${movieOrTv}/${id}/aggregate_credits?api_key=${k}&language=de`;
  } else return `${BaseUrl}/${movieOrTv}/${id}/credits?api_key=${k}&language=de`;
};

export const personDetailUrl = (personId: number): string => `${BaseUrl}/person/${personId}?api_key=${k}&language=de&append_to_response=images`;
// Get all the Movies or TV-Shows from Person
// .cast[] for Acting
// .crew[] for other Jobs
export const personCreditsUrl = (personId: number, category: TCategoryWatch): string => `${BaseUrl}/person/${personId}/${category}_credits?api_key=${k}&language=de`
export const personAllCreditsUrl = (personId: number): string => `${BaseUrl}/person/${personId}/combined_credits?api_key=${k}&language=de`

