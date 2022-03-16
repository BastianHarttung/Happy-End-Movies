import "./App.scss";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Hauptmenue from "./pages/Hauptmenue";
import Filmsuche from "./pages/Filmsuche";
import DetailsMovie from "./pages/DetailsMovie";
import DetailsPerson from "./pages/DetailsPerson";
import DetailsTv from "./pages/DetailsTv";
import Showroom from "./pages/Showroom";
import Impressum from "./pages/Impressum";

import {
   genreUrl,
   castUrl,
   personDetailUrl,
   searchUrl,
   movieDetailsUrl,
   imagesUrl,
} from "./constants";

import firestoreDb from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import Hilfe from "./pages/Hilfe";
import Login from "./pages/Login";
import "dotenv/config";
import ModalUserSettings from "./components/Modal-UserSettings";
import Menu from "./pages/Menu";

function App() {
   const [selectedMovie, setSelectedMovie] = useState({});
   const [selectedPerson, setSelectedPerson] = useState({});

   const [openUserSettings, setOpenUserSettings] = useState(false);

   const [userId, setUserId] = useState(23);

   return (
      <BrowserRouter basename="/happy-end-movies">
         <div>
            {openUserSettings && (
               <ModalUserSettings
                  openModalUser={(modal) => setOpenUserSettings(modal)}
               />
            )}

            <Routes>
               <Route path="/" exact={true} element={<Login />} />

               <Route
                  path=""
                  element={
                     <Menu
                        setOpenUserSettings={(modal) =>
                           setOpenUserSettings(modal)
                        }
                     />
                  }
               >
                  <Route
                     path="filmsuche"
                     exact={true}
                     element={
                        <Filmsuche
                           saveSelectedMovie={(movie, category) =>
                              saveSelectedMovieOrPerson(movie, category)
                           }
                        />
                     }
                  />
                  <Route
                     path="showroom"
                     exact={true}
                     element={
                        <Showroom
                           saveSelectedMovie={(movie, category) =>
                              saveSelectedMovieOrPerson(movie, category)
                           }
                        />
                     }
                  />
                  <Route
                     path="detailansicht/movie/:id"
                     exact={true}
                     element={
                        <DetailsMovie
                           saveMovieToDb={(movieForDb) =>
                              saveMovieToDb(movieForDb)
                           }
                           saveSelectedPerson={(person) =>
                              saveSelectedMovieOrPerson(person, "person")
                           }
                           movie={selectedMovie}
                           user={userId}
                        />
                     }
                  />
                  <Route
                     path="detailansicht/tv/:id"
                     exact={true}
                     element={
                        <DetailsTv
                           saveMovieToDb={(movieForDb) =>
                              saveMovieToDb(movieForDb)
                           }
                           saveSelectedPerson={(person) =>
                              saveSelectedMovieOrPerson(person, "person")
                           }
                           movie={selectedMovie}
                           user={userId}
                        />
                     }
                  />
                  <Route
                     path="detailansicht/person/:id"
                     exact={true}
                     element={
                        <DetailsPerson
                           saveSelectedMovie={(movie, category) =>
                              saveSelectedMovieOrPerson(movie, category)
                           }
                           person={selectedPerson}
                        />
                     }
                  />
                  <Route
                     path="impressum"
                     exact={true}
                     element={<Impressum />}
                  />
                  <Route path="hilfe" exact={true} element={<Hilfe />} />
                  <Route path="start" exact={true} element={<Hauptmenue />} />
               </Route>
            </Routes>
         </div>
      </BrowserRouter>
   );

   /**
    * Save Movie to Database Firebase by clicking on Detailansicht Speichern
    * @param {object} movieDb
    * @return {Promise<void>}
    */
   async function saveMovieToDb(movieDb) {
      try {
         console.log(movieDb.id);
         const actualMoviesDoc = doc(firestoreDb, "movies/" + movieDb.id);
         await setDoc(actualMoviesDoc, movieDb);
         console.log("In Firestore Gespeichert");
      } catch (e) {
         console.log("Error", e);
      }
   }

   /**
    * Get genres and fsk and has_happy_end
    * and save to selectedMovie state
    * @param {object} object
    * @param {string} searchCategory eg 'movie' || 'tv'
    * @return {Promise<void>}
    */
   async function saveSelectedMovieOrPerson(object, searchCategory) {
      //console.log('App movie', object)
      //console.log('app category', searchCategory)
      if (searchCategory !== "person") {
         const details = await getDetailMovieInfos(object.id, searchCategory);
         const images = await getImagesFromMovie(object.id, searchCategory);
         const genres = await getGenreNames(object, searchCategory);
         const fsk = await getGermanFSKFromDetails(details, searchCategory);
         const hasHappyEnd = await calculateHappyEnd(object);
         const cast = await getCastForMovie(object.id, searchCategory);
         const directors = await getDirectorForMovie(object.id, searchCategory);
         const completeMovieInfo = {
            ...object,
            ...details,
            images: images,
            category: searchCategory,
            genresD: genres,
            fsk: fsk,
            userSelections: {
               [userId]: {
                  happyEnd_Voting: object.userSelections
                     ? object.userSelections[userId].happyEnd_Voting
                     : "",
                  haveSeen: object.userSelections
                     ? object.userSelections[userId].haveSeen
                     : false,
               },
            },
            has_happy_end: hasHappyEnd,
            cast: cast,
            directors: directors,
         };
         setSelectedMovie(completeMovieInfo);
         console.log(completeMovieInfo);
      } else {
         const personKnownFor = await getInfosFromApi(object.name);
         const personDetails = await getDetailPersonInfosFromApi(object.id);
         setSelectedPerson({ ...object, ...personKnownFor, ...personDetails });
      }
   }

   /**
    *Get Biography, Birthday and other detailed infos and Images from person
    * @param {number} personId
    * @return {Promise<void>} object{}
    */
   async function getDetailPersonInfosFromApi(personId) {
      const response = await fetch(personDetailUrl(personId));
      let data = await response.json();
      return data;
   }

   /**
    *Get known_for movies and other infos from person
    * @param {string} name
    * @return {Promise<void>} object{}
    */
   async function getInfosFromApi(name) {
      const response = await fetch(searchUrl("person") + name);
      const data = await response.json();
      const result = await data.results[0];
      return result;
   }

   /**
    * Calculate has_happy_end by counting happyEnd_Voting
    * @param {object} movie
    * @return {string|boolean} true|false|'neutral'
    */
   async function calculateHappyEnd(movie) {
      if (typeof movie.happyEnd_Voting === "object") {
         //console.log('calculate happyend')
         const happyEndArray = Object.values(movie.happyEnd_Voting);
         const trueCount = happyEndArray.reduce((acc, current) => {
            if (current) acc++;
            else if (!current) acc--;
            return acc;
         }, 0);
         if (trueCount > 0) return true;
         else if (trueCount === 0 || movie.happyEnd_Voting === false)
            return "neutral";
         else return false;
      } else return "neutral";
   }

   /**
    * Get Details infos from Movie
    * @param id
    * @param category
    * @return {Promise<void>}
    */
   async function getDetailMovieInfos(id, category) {
      const response = await fetch(movieDetailsUrl(category, id));
      let data = await response.json();
      return data;
   }

   /**
    * Get Images from Movie
    * @param id
    * @param category
    * @return {Promise<void>}
    */
   async function getImagesFromMovie(id, category) {
      const response = await fetch(imagesUrl(category, id));
      let data = await response.json();
      return data;
   }

   /**
    * Get Genre from TMDB API
    * @param {number} genreId
    * @return {Promise<*>}
    */
   async function getGenreNameFromApi(genreId, searchCategory) {
      const response = await fetch(genreUrl(searchCategory));
      let data = await response.json();
      const genre = data.genres.find((genre) => genre.id === genreId);
      return genre.name;
   }

   /**
    * Get Genre Names and return in Array
    * @param {object} movie
    * @param {string} searchCategory 'movie' || 'title'
    * @return {Promise<*[]>} Array with Genres example: ['Action', 'Komödie']
    */
   async function getGenreNames(movie, searchCategory) {
      let genres = [];
      for (let i = 0; i < movie.genre_ids.length; i++) {
         const genreName = await getGenreNameFromApi(
            movie.genre_ids[i],
            searchCategory
         );
         genres.push(genreName);
      }
      return genres;
   }

   /**
    * Get German FSK from Detail Infos
    * @param {object} detailsObject
    * @return {Promise<number>} The FSK example: 16
    */
   async function getGermanFSKFromDetails(detailsObject, category) {
      if (category === "movie") {
         const releaseGerman = detailsObject.releases.countries.find(
            (country) => country.iso_3166_1 === "DE"
         );
         if (!!releaseGerman) return +releaseGerman.certification;
         else return 400;
      } else if (category === "tv") {
         const ratingsGerman = detailsObject.content_ratings.results.find(
            (country) => country.iso_3166_1 === "DE"
         );
         if (!!ratingsGerman) return +ratingsGerman.rating;
         else return 400;
      }
   }

   /**
    * Get Cast for Movie
    * @param {number} movieId
    * @param {string} searchCategory 'movie' || 'title'
    * @return {Promise<object array>} All Actors
    */
   async function getCastForMovie(movieId, searchCategory) {
      const castUrlMovie = castUrl(searchCategory, movieId);
      const response = await fetch(castUrlMovie);
      let data = await response.json();
      let castArray = [];
      data.cast.forEach((actor) => castArray.push(actor));
      return castArray;
   }

   /**
    * Get Cast for Movie
    * @param {number} movieId
    * @param {string} searchCategory 'movie' || 'title'
    * @return {Promise<object array>} Directors
    */
   async function getDirectorForMovie(movieId, searchCategory) {
      const castUrlMovie = castUrl(searchCategory, movieId);
      const response = await fetch(castUrlMovie);
      let data = await response.json();
      let directorArray = [];
      for (let i = 0; i < data.crew.length; i++) {
         if (data.crew[i].job === "Director") {
            directorArray.push(data.crew[i]);
         }
      }
      return directorArray;
   }
}

export default App;
