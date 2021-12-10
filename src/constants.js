export const emptyMovieArray = [
    {id: 1, title: 'Searching...', poster_path: null},
    {id: 2, title: 'Searching...', poster_path: null},
    {id: 3, title: 'Searching...', poster_path: null},
    {id: 4, title: 'Searching...', poster_path: null},
    {id: 5, title: 'Searching...', poster_path: null}
]

const apiKeyTmdb = 'd2aa68fbfa10f4f356fe29718bfa3508'

export const searchAllUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKeyTmdb}&language=de&include_adult=false&query=`
export const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTmdb}&language=de&query=`
export const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyTmdb}&language=de&page=1`

export const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKeyTmdb}&language=de`
export const fskUrl = `https://altersfreigaben.de/api2/s/`

export const imageUrl = `https://image.tmdb.org/t/p/w500`
export const imageUrlSmall = `https://image.tmdb.org/t/p/w200`

export const castUrl = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKeyTmdb}&language=de`


