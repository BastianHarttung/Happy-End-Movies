import classes from "./Filmsuche.module.scss";
import {useEffect, useState} from "react";
import SearchResultBox from "../components/SearchResultBox";
import {searchUrl, trendingMoviesUrl} from "../constants";
import SearchBar from "../components/SearchBar";
import {Button} from "../styleComponents/ButtonStyleComp";
import Pagination from "../components/Pagination";
import {TCategory, TCategorySearch} from "../interfaces/types";
import apiStore from "../stores/api-store";


const Filmsuche = () => {

  const {saveSelectedMovieOrPerson} = apiStore;

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchFor, setSearchFor] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searchStarted, setSearchStarted] = useState(false);
  const [searchingCategory, setSearchingCategory] = useState<TCategorySearch>("multi");

  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState(0);

  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getPopularMoviesFromTmdb().then((response) => {
      setPopularMovies(response);
    });
  }, []);

  return (
    <div className={classes.filmsucheSection}>

      <div className={classes.filmsucheContainer}>
        <SearchBar
          length={22}
          searchSize={19}
          searchMovie={(movieName) => searchMovie(movieName)}
          saveSearchFor={(movieName) => setSearchFor(movieName)}
        />

        <div className={classes.categoryBtnContainer}>
          <Button name="Alles"
                  fontSize={1.2}
                  activated={searchingCategory === "multi"}
                  onClick={() => searchMovie(searchFor, "multi")}/>
          <Button name="Filme"
                  fontSize={1.2}
                  activated={searchingCategory === "movie"}
                  onClick={() => searchMovie(searchFor, "movie")}/>
          <Button name="Serien"
                  fontSize={1.2}
                  activated={searchingCategory === "tv"}
                  onClick={() => searchMovie(searchFor, "tv")}/>
          <Button name="Schauspieler"
                  fontSize={1.2}
                  activated={searchingCategory === "person"}
                  onClick={() => searchMovie(searchFor, "person")}/>
        </div>

        {searchStarted ?
          <div className={classes.headOverResults}>Suchergebnisse für: {searchResult}</div>
          : <div className={classes.headOverResults}>Täglicher Trend</div>}

        {searchStarted ?
          <div className={classes.resultSection}>
            {searchedMovies.map((movie, index) =>
              <SearchResultBox key={index}
                               saveSelectedMovie={(currentMovie, category: TCategory) => saveSelectedMovieOrPerson(currentMovie, category)}
                               category={searchingCategory}
                               movie={movie}/>)}</div>
          :
          <div className={classes.resultSection}>

            {popularMovies.slice(0, 5).map((movie, index) =>
              <SearchResultBox key={index}
                               saveSelectedMovie={(currentMovie, category: TCategory) => saveSelectedMovieOrPerson(currentMovie, category)}
                               category={searchingCategory}
                               movie={movie}/>)}</div>}

        {searchStarted && <Pagination totalPages={totalPages}
                                      activePage={activePage}
                                      changePage={(page: number) => changePage(page)}
                                      totalResults={totalResults}/>}

      </div>

    </div>
  );

  //Get Popular Movies from TMDB API
  async function getPopularMoviesFromTmdb(): Promise<any> {
    const response = await fetch(trendingMoviesUrl);
    let data = await response.json();
    return data.results;
  };

  // Search Movie by clicking the Search Button
  // -set page to number 1
  // -delete die input field
  async function searchMovie(movieName: string, searchCategory: TCategorySearch = "multi"): Promise<void> {
    if (movieName.length > 0) {
      setSearchResult(movieName);
      setSearchingCategory(searchCategory);
      const tmdbMovie = await getJsonFromTmdb(movieName, 1, searchCategory);
      setTotalResults(await tmdbMovie.total_results);
      setTotalPages(makePageArray(await tmdbMovie.total_pages));
      setSearchedMovies(tmdbMovie.results);
      setActivePage(1);
      setSearchFor(movieName);
      setSearchStarted(true);
      window.location.hash = movieName;
    } else {
      setSearchingCategory("multi");
      setSearchStarted(false);
    }
  }

  //  Get Data from TMDB API
  //  - set total results
  //  - make array with pages and set to total pages
  async function getJsonFromTmdb(movieName: string, pageNumber: number, searchCategory: TCategorySearch): Promise<any> {
    const response = await fetch(searchUrl(searchCategory, movieName, pageNumber));
    let data = await response.json();
    console.log("data from Tmdb", data);
    return data;
  }

  /**
   * Change Page and load from API by clicking Page Number
   * And set Active Page Number for colored view
   * @param {number} page
   * @return {Promise<void>}
   */
  async function changePage(page: number) {
    setSearchedMovies(await getJsonFromTmdb(searchFor, page, searchingCategory));
    setActivePage(page);
  }

  /**
   * Make an Array with Pages
   * @param numberPages
   * @return {*[]} Array with Numbers from 1 to numberPages
   */
  function makePageArray(numberPages: number) {
    let pageArray = [];
    for (let i = 1; i <= numberPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
  }

};

export default Filmsuche;