import './App.css';
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hauptmenue from "./components/Hauptmenue";
import Bewertung from "./components/Bewertung";
import DetailAnsicht from "./components/DetailAnsicht";
import {useState} from "react";

function App() {

    const [selectedMovie, setSelectedMovie] = useState({})

    function saveSelectedMovie(movie) {
        setSelectedMovie(movie)
        console.log(movie)
    }

    return (
        <BrowserRouter >

            <Header/>

            <Routes>

                <Route path='/bewertung' element={<Bewertung callback={(movie) => {saveSelectedMovie(movie)}}/>} exact={true} />

                <Route path='/detailansicht' element={<DetailAnsicht movie={selectedMovie} />} exact={true} />

                <Route path='/' exact={true} element={<Hauptmenue />} />

            </Routes>

            <Footer/>

        </BrowserRouter>
    );
}

export default App;
