import {TCategory, TCategorySearch, TCategoryWatch} from "./interfaces/types";
import {IMovieAllInfos, IPerson, ITvShow} from "./interfaces/interfaces";

//----------Empty Objects-------------------------------------------
export const emptyMovie: IMovieAllInfos = {
  id: 0,
  title: "",
  name: "",
  original_name: "",
  has_happy_end: false,
  category: undefined,
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
  genres: [{
    id: 0,
    name: "",
  }],
  homepage: "",
  imdb_id: "",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  production_companies: [{
    id: 0,
    logo_path: "",
    name: "",
    origin_country: "",
  }],
  production_countries: [{
    iso_3166_1: "",
    name: "",
  }],
  release_date: "",
  revenue: 0,
  runtime: 0,
  spoken_languages: [{
    english_name: "",
    iso_639_1: "",
    name: "",
  }],
  status: "",
  tagline: "",
  video: false,
  vote_average: 0,
  vote_count: 0,
  releases: {
    countries: [{
      certification: "",
      iso_3166_1: "",
      primary: false,
      release_date: "",
    }]
  }
}

export const emptyTvShow: ITvShow = {
  backdrop_path: "",
  first_air_date: "",
  genre_ids: [1],
  id: 0,
  name: "",
  origin_country: [""],
  original_language: "",
  original_name: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  vote_average: 0,
  vote_count: 0,
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
export const watchDetailsUrl = (category: TCategoryWatch, tmdbId: number): string => `${BaseUrl}/${category}/${tmdbId}?api_key=${k}&language=de&append_to_response=releases,videos,content_ratings`;

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

