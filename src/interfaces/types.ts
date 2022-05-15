export type TCategoryWatch = "movie" | "tv"

export type TCategory = TCategoryWatch | "person"

export type TCategorySearch = TCategory | "multi"

export type TCategoryFilter = TCategory | "allCategories"


export type THappyEndFilter = "allEnds" | "true" | "false"

export type THasHappyEnd = "neutral" | "true" | "false"


export type TGender = 0 | 1 | 2