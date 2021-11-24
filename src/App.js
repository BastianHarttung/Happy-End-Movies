import './App.css';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hauptmenue from "./pages/Hauptmenue";
import Bewertung from "./pages/Bewertung";
import DetailAnsicht from "./pages/DetailAnsicht";
import Showroom from "./pages/Showroom";

import {genreUrl, fskUrl} from "./constants"

import firestoreDb from "./firebase-config";
import {doc, setDoc,getDocs,collection} from 'firebase/firestore';


function App() {

    const db = async () => {
        const moviesArray = async function loadMoviesFromDb() {
            const movieCollect = await getDocs(collection(firestoreDb, 'movies'));
            const moviesArray = [];
            movieCollect.forEach((doc) => {
                moviesArray.push(doc.data())
            });
            return moviesArray
        }
        setAllMovies(await moviesArray)
    }


    const [selectedMovie, setSelectedMovie] = useState({})
    const [allMovies, setAllMovies] = useState([])
    const [dbLength, setDbLength] = useState(0)


    useEffect( ()=>{
        const moviesCollectionRef = collection(firestoreDb,'movies');
        const getMovies = async () =>{
            const data = await getDocs(moviesCollectionRef);
            setDbLength(data.docs.length);
            setAllMovies(data.docs.map((doc) => ({...doc.data()})))
        }
        getMovies()
    },[]);


    async function saveMovieToDb(movieDb) {
        try {
            console.log(movieDb.id)
            const actualMoviesDoc = doc(firestoreDb, 'movies/' + movieDb.id)
            await setDoc(actualMoviesDoc, movieDb);
            console.log('In Firestore Gespeichert');
            await db
        } catch (e) {
            console.log('Error', e)
        }
    }

    // Get Genre from TMDB ApI
    async function getGenreNameFromApi(genreId) {
        const response = await fetch(genreUrl);
        let data = await response.json();
        const genre = data.genres.find(genre => genre.id === genreId)
        return genre.name
    }

    async function getGenreNames(movie) {
        let genres = []
        for (let i = 0; i < movie.genre_ids.length; i++) {
            const genreName = await getGenreNameFromApi(movie.genre_ids[i])
            genres.push(genreName)
        }
        return genres
    }

    // Get FSK from alterfreigaben.de API
    //TODO Cors?
    async function getFskFromApi(movieId) {
        const fskUrlMovie = fskUrl + movieId + '/de'
        const response = await fetch(fskUrlMovie);
        let data = await response.json();
        return data
    }


    async function saveSelectedMovie(movie) {
        const genres = await getGenreNames(movie)
        const fsk = await getFskFromApi(movie.id)
        setSelectedMovie({...movie, genres, fsk})
    }


    return (
        <BrowserRouter>

            <div>

                <Header/>

                <Routes>

                    <Route path='/bewertung'
                           exact={true}
                           element={
                               <Bewertung
                                   callback={(movie) => {
                                       saveSelectedMovie(movie)
                                   }}
                               />}

                    />

                    <Route path='/detailansicht'
                           exact={true}
                           element={
                               <DetailAnsicht
                                   parentCallback={(movieForDb) => {
                                       saveMovieToDb(movieForDb)
                                   }}
                                   movie={selectedMovie}/>}
                    />

                    <Route path='/showroom'
                           exact={true}
                           element={
                               <Showroom
                                   moviesDB={allMovies}
                                    dbLength={dbLength}/>}
                    />

                    <Route path='/'
                           exact={true}
                           element={<Hauptmenue/>}
                    />

                </Routes>
            </div>

            <Footer/>

        </BrowserRouter>
    );
}

export default App;
