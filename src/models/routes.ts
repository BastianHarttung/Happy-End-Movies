import {TCategory} from "./types";

export abstract class ROUTES {
  public static readonly LOGIN = "/";
  public static readonly START = "/start";
  public static readonly FILMSUCHE = "/filmsuche";
  public static readonly SHOWROOM = "/showroom";
  public static readonly IMPRESSUM = "/impressum";
  public static readonly HILFE = "/hilfe";

  public static readonly DETAILS = "/detailansicht";
  public static readonly DETAILS_MOVIE = `${ROUTES.DETAILS}/movie/:id`;
  public static readonly DETAILS_TV = `${ROUTES.DETAILS}/tv/:id`;
  public static readonly DETAILS_PERSON = `${ROUTES.DETAILS}/person/:id`;

  public static DETAILS_WITH_CATEGORY_ID(category: TCategory, id: string) {
    return `${ROUTES.DETAILS}/${category}/${id}`
  }

  public static MOVIE_DETAILS(id: string) {
    return `${ROUTES.DETAILS}/movie/${id}`
  }

  public static TV_DETAILS(id: string) {
    return `${ROUTES.DETAILS}/tv/${id}`
  }

  public static PERSON_DETAILS(id: string) {
    return `${ROUTES.DETAILS}/person/${id}`
  }

}