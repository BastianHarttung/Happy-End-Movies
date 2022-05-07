import classes from "./SearchBar.module.scss";
import {FaSearch} from "react-icons/all";
import {useState, useEffect} from "react";
import React from "react";
import {TCategorySearch} from "../interfaces/types";

interface ISearchBarProps {
  length: number,
  searchSize: number,
  searchMovie: (movieName: string, searchCategory?: TCategorySearch) => void,
  saveSearchFor: (movieName: string) => void,
}

const SearchBar = ({length, searchSize, searchMovie, saveSearchFor}: ISearchBarProps) => {

  const locationHashString: string = window.location.hash.substring(1).split("%20").join(" ");
  const [movieName, setMovieName] = useState<string>(locationHashString);

  /**
   * After hit 4 chars on input search start searching movie
   */
  useEffect(() => {
    if (movieName.length >= 4) {
      searchMovie(movieName);
    }
  }, [movieName]);

  return (
    <div className={classes.searchBarContainer}>
      <div className={classes.searchContainer}>
        <input className={classes.searchInput}
               style={{fontSize: searchSize + "px"}}
               type="search"
               size={length}
               placeholder="Suche"
               value={movieName}
               onKeyPress={event => keyPressEvent(event)}
               onChange={e => {
                 saveSearchFor(e.target.value);
                 setMovieName(e.target.value);
               }}/>

        <FaSearch onClick={() => {
          searchMovie(movieName);
          setMovieName("");
          window.location.hash = "";
        }}
                  style={{width: searchSize + 5, height: searchSize + 5}}
                  className={classes.searchButton}/>
      </div>

    </div>
  );

  /**
   * Listen if the Enter-Button is pressed
   */
  function keyPressEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      searchMovie(movieName);
    }
  }

};

export default SearchBar;