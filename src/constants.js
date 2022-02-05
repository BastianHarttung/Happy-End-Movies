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
 * @param {string} searchFor eg 'multi' || 'movie' || 'tv' ||  'person' || 'company' || 'keyword'
 * @return {string} `https://api.themoviedb.org/...`
 */
export const searchUrl = (searchFor) => `https://api.themoviedb.org/3/search/${searchFor}?api_key=${apiKeyTmdb}&language=de&include_adult=false&query=`
export const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeyTmdb}&language=de&page=1`
export const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKeyTmdb}`

//searchFor = {string} 'movie' || 'tv'
export const genreUrl = (searchFor) => `https://api.themoviedb.org/3/genre/${searchFor}/list?api_key=${apiKeyTmdb}&language=de`
export const fskUrl = `https://altersfreigaben.de/api2/s/`
//TODO Use movieDetailsUrl In releases are Certification (FSK)
export const movieDetailsUrl = (category, tmdbId) => `https://api.themoviedb.org/3/${category}/${tmdbId}?api_key=${apiKeyTmdb}&language=de&append_to_response=releases`

export const imageUrl = `https://image.tmdb.org/t/p/w500`
export const imageUrlSmall = `https://image.tmdb.org/t/p/w200`

export const castUrl = (movieOrTv, id) => {
    if (movieOrTv === 'tv') {
        return `https://api.themoviedb.org/3/${movieOrTv}/${id}/aggregate_credits?api_key=${apiKeyTmdb}&language=de`
    } else return `https://api.themoviedb.org/3/${movieOrTv}/${id}/credits?api_key=${apiKeyTmdb}&language=de`
}

export const personDetailUrl = (personId) => `https://api.themoviedb.org/3/person/${personId}?api_key=${apiKeyTmdb}&language=de&append_to_response=images`
