import './App.css';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hauptmenue from "./pages/Hauptmenue";
import Bewertung from "./pages/Bewertung";
import DetailAnsicht from "./pages/DetailAnsicht";
import Showroom from "./pages/Showroom";
import Impressum from "./pages/Impressum";

import {genreUrl, fskUrl, castUrl} from "./constants"

import firestoreDb from "./firebase-config";
import {doc, setDoc, getDocs, collection} from 'firebase/firestore';


function App() {

    const [selectedMovie, setSelectedMovie] = useState({})
    const [allMovies, setAllMovies] = useState([])
    const [dbLength, setDbLength] = useState(0)

    useEffect(() => {
        const moviesCollectionRef = collection(firestoreDb, 'movies');
        const getMovies = async () => {
            const data = await getDocs(moviesCollectionRef);
            setDbLength(data.docs.length);
            setAllMovies(data.docs.map((doc) => ({...doc.data()})))
        }
        getMovies()
    }, []);


    return (
        <BrowserRouter>

            <div>

                <Header/>

                <Routes>

                    <Route path='/bewertung'
                           exact={true}
                           element={
                               <Bewertung
                                   callback={(movie) => saveSelectedMovie(movie)}
                               />}
                    />

                    <Route path='/detailansicht'
                           exact={true}
                           element={
                               <DetailAnsicht
                                   saveMovieToDb={(movieForDb) => saveMovieToDb(movieForDb)}
                                   movie={selectedMovie}/>}
                    />

                    <Route path='/showroom'
                           exact={true}
                           element={
                               <Showroom
                                   moviesDB={allMovies}
                                   dbLength={dbLength}
                                   callback={(movie) => saveSelectedMovie(movie)}
                               />}
                    />

                    <Route path='/'
                           exact={true}
                           element={<Hauptmenue/>}
                    />

                    <Route path='/impressum'
                           exact={true}
                           element={<Impressum/>}
                    />

                </Routes>
            </div>

            <Footer/>

        </BrowserRouter>
    );

    /**
     * Load Data from Firestore Database and save to State
     * @returns {Promise<void>} set state for allMovies
     */
    async function saveMoviesToState() {
        const moviesArray = async function loadMoviesFromDb() {
            const movieCollect = await getDocs(collection(firestoreDb, 'movies'));
            const moviesArray = [];
            movieCollect.forEach((doc) => {
                moviesArray.push(doc.data())
            });

            return moviesArray
        }
        setAllMovies(await moviesArray())
    }

    /**
     * Save Movie to Database by clicking on Detailansicht Speichern
     * @param {object} movieDb
     * @return {Promise<void>}
     */
    async function saveMovieToDb(movieDb) {
        try {
            console.log(movieDb.id)
            const actualMoviesDoc = doc(firestoreDb, 'movies/' + movieDb.id)
            await setDoc(actualMoviesDoc, movieDb);
            console.log('In Firestore Gespeichert');
            await saveMoviesToState()
        } catch (e) {
            console.log('Error', e)
        }
    }

    /**
     * Get genres and fsk and has_happy_end
     * and save to selectedMovie state
     * @param {object} movie
     * @return {Promise<void>}
     */
    async function saveSelectedMovie(movie) {
        const genres = await getGenreNames(movie);
        const fsk = await getFskFromApi(movie.id);
        const cast = await getCastForMovie(movie.id);
        const directors = await getDirectorForMovie(movie.id);
        const hasHappyEnd = movie.has_happy_end === true ? true
            : movie.has_happy_end === false ? false
                : 'neutral'
        setSelectedMovie({
            ...movie,
            genres: genres,
            fsk: fsk,
            has_happy_end: hasHappyEnd,
            cast: cast,
            directors: directors
        })
        console.log({
            ...movie,
            genres: genres,
            fsk: fsk,
            has_happy_end: hasHappyEnd,
            cast: cast,
            directors: directors
        })
    }

    /**
     * Get Genre from TMDB API
     * @param {number} genreId
     * @return {Promise<*>}
     */
    async function getGenreNameFromApi(genreId) {
        const response = await fetch(genreUrl);
        let data = await response.json();
        const genre = data.genres.find(genre => genre.id === genreId)
        return genre.name
    }

    /**
     * Get Genre Names and return in Array
     * @param {object} movie
     * @return {Promise<*[]>} Array with Genres example: ['Action', 'Komödie']
     */
    async function getGenreNames(movie) {
        let genres = []
        for (let i = 0; i < movie.genre_ids.length; i++) {
            const genreName = await getGenreNameFromApi(movie.genre_ids[i])
            genres.push(genreName)
        }
        return genres
    }

    /**
     * Get FSK from alterfreigaben.de API
     * @param {number} movieId
     * @return {Promise<number>} The FSK example: 16
     * TODO CORS?
     */
    async function getFskFromApi(movieId) {
        const fskUrlMovie = fskUrl + movieId + '/de'
        const response = await fetch(fskUrlMovie);
        let data = await response.json();
        return data
    }

    /**
     * Get Cast for Movie
     * @param {number} movieId
     * @return {Promise<object array>} All Actors
     */
    async function getCastForMovie(movieId) {
        const castUrlMovie = castUrl(movieId);
        const response = await fetch(castUrlMovie);
        let data = await response.json();
        let castArray = []
        data.cast.forEach(actor => castArray.push(actor))
        return castArray
    }

    /**
     * Get Cast for Movie
     * @param {number} movieId
     * @return {Promise<object array>} Directors
     */
    async function getDirectorForMovie(movieId) {
        const castUrlMovie = castUrl(movieId);
        const response = await fetch(castUrlMovie);
        let data = await response.json();
        let directorArray = []
        for (let i = 0; i < data.crew.length; i++) {
            if (data.crew[i].job === 'Director') {
                directorArray.push(data.crew[i])
            }
        }
        return directorArray
    }

}

export default App;
