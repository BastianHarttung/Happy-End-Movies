import './App.css';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hauptmenue from "./components/Hauptmenue";
import Bewertung from "./components/Bewertung";
import DetailAnsicht from "./components/DetailAnsicht";
import {useState} from "react";
import firestoreDb from "./Firebase";

import { doc, setDoc, updateDoc, collection, getDocs, addDoc } from 'firebase/firestore';
//import firestoreDb from "./Firebase";

function App() {

    const [selectedMovie, setSelectedMovie] = useState({})

    const genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=d2aa68fbfa10f4f356fe29718bfa3508&language=de"
    const fskUrl = "https://altersfreigaben.de/api2/s/"

    async function saveMovieToDb(movieDb) {
        try{
            const movie= await addDoc(collection(firestoreDb, 'movies'), movieDb);
            console.log('ID: ' ,movie.id);
        }catch (e) {
            console.log('Error',e)
        }
    }

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

    //TODO Cors?
    async function getFskFromApi(movieId) {
        const fskUrlMovie = fskUrl + movieId +'/de'
        console.log(fskUrlMovie)
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

            <Header/>

            <Routes>

                <Route path='/bewertung' element={<Bewertung callback={(movie) => {
                    saveSelectedMovie(movie)
                }}/>} exact={true}/>

                <Route path='/detailansicht' element={<DetailAnsicht parentCallback={(movieForDb) =>{saveMovieToDb(movieForDb)}} movie={selectedMovie}/>} exact={true}/>

                <Route path='/' exact={true} element={<Hauptmenue/>}/>

            </Routes>

            <Footer/>

        </BrowserRouter>
    );
}

export default App;
