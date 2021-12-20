export const emptyMovieArray = [
    {id: 1, title: 'Searching...', poster_path: null},
    {id: 2, title: 'Searching...', poster_path: null},
    {id: 3, title: 'Searching...', poster_path: null},
    {id: 4, title: 'Searching...', poster_path: null},
    {id: 5, title: 'Searching...', poster_path: null}
]

const apiKeyTmdb = 'd2aa68fbfa10f4f356fe29718bfa3508'

/**
 *What are you searching for? Movie, TV-Show, Person, all Things (Multi)
 * @param {string} searchFor eg 'movie' || 'tv' || 'multi' || 'person' || 'company' || 'keyword'
 * @return {string} `https://api.themoviedb.org/...`
 */
export const searchUrl =  (searchFor) => `https://api.themoviedb.org/3/search/${searchFor}?api_key=${apiKeyTmdb}&language=de&include_adult=false&query=`
export const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyTmdb}&language=de&page=1`

//searchFor = {string} 'movie' || 'tv'
export const genreUrl = (searchFor) => `https://api.themoviedb.org/3/genre/${searchFor}/list?api_key=${apiKeyTmdb}&language=de`
export const fskUrl = `https://altersfreigaben.de/api2/s/`

export const imageUrl = `https://image.tmdb.org/t/p/w500`
export const imageUrlSmall = `https://image.tmdb.org/t/p/w200`

export const castUrl = (movieOrTv, id) => `https://api.themoviedb.org/3/${movieOrTv}/${id}/credits?api_key=${apiKeyTmdb}&language=de`


