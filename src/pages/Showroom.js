import classes from "./Showroom.module.css";
import SearchResultBox from "../components/SearchResultBox";
import {useEffect, useState} from "react";


const Showroom = ({moviesDB, dbLength, callback}) => {

    const [filteredMovies, setFilteredMovies] = useState([])
    const [filterLength, setFilterLength] = useState(dbLength)

    /**
     * Sort Movies by Title and update movies after Timeout
     */
    useEffect(() => {
        moviesDB.sort((a, b) => (a.title < b.title) ? -1
            : (a.title > b.title) ? 1
                : 0)
        if (filterLength === dbLength) {
            setTimeout(() => setFilteredMovies(moviesDB), 1800)
            setFilterLength(moviesDB.length)
        }
    }, [moviesDB, filterLength, dbLength])

    /**
     * Scrolling Sidebar
     */
    const [scrollPosition, setScrollPosition] = useState(80);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(Math.max(0, 80 - position))
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <section className={classes.showroomSection}>
            <div className={classes.sidebar} style={{top: scrollPosition + 'px'}}>
                <div className={classes.filterContainer}>
                    <div onClick={() => filterMoviesByHappyEnd(moviesDB, 'all')} className={classes.filter}>Alle Filme
                    </div>
                    <div onClick={() => filterMoviesByHappyEnd(moviesDB, true)} className={classes.filter}>Filme mit
                        Happy End
                    </div>
                    <div onClick={() => filterMoviesByHappyEnd(moviesDB, false)} className={classes.filter}>Filme ohne
                        Happy End
                    </div>
                </div>
            </div>

            {filteredMovies.length > 0 ?
                <div className={classes.filteredMoviesContainer}>

                    <div className={classes.filteredMoviesResult}>
                        {filteredMovies.map((movie) =>
                            <SearchResultBox
                                key={movie.id}
                                movie={movie}
                                to='/detailansicht'
                                parentCallback={(currentMovie) => callback(currentMovie)}
                            />)}

                    </div>

                    <div className={classes.infosContainer}>
                        <div>{filterLength} Filme</div>
                    </div>

                </div>
                : filteredMovies.length === 0 ?
                    <div className={classes.filteredMoviesContainer}>
                        <div className={classes.loader}>Loading...</div>
                    </div>
                    : 'Load'}

        </section>
    )

    /**
     * Filter Movies with or without HappyEnd
     * @param {array} movies movies Array
     * @param {boolean} hasHappyEnd true or false
     * @return {array with objects}
     */
    function filterMoviesByHappyEnd(movies, hasHappyEnd) {
        if (hasHappyEnd === 'all') {
            setFilterLength(movies.length)
            setFilteredMovies(movies)
        } else {
            const movieFilter = movies.filter(movie => movie.has_happy_end === hasHappyEnd)
            setFilteredMovies(movieFilter)
            setFilterLength(movieFilter.length)
        }
    }

}

export default Showroom