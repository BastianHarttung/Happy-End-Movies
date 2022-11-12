import classes from './SearchBar.module.scss';
import {FaSearch} from "react-icons/fa";
import {useState, useEffect} from "react";
import React from "react";
import {TCategorySearch} from "../models/types";

interface ISearchBarProps {
  length: number,
  size?: number,
  searchMovie: (movieName: string, searchCategory?: TCategorySearch) => void,
  saveSearchFor: (movieName: string) => void,
}

const SearchBar = ({length, size = 50, searchMovie, saveSearchFor}: ISearchBarProps) => {

  const locationHashString: string = window.location.hash.substring(1).split("%20").join(" ");
  const [movieName, setMovieName] = useState<string>(locationHashString);

  // Debouncing to only start searching after an typing delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!!movieName.trim()) {
        console.log("Searching...")
        searchMovie(movieName.trim())
      }
    }, 800)

    return () => clearTimeout(timeout)
  }, [movieName]);

  return (
    <div className={classes.searchBarContainer}>
      <div className={classes.searchContainer}>
        <input className={classes.searchInput}
               style={{fontSize: size + "px"}}
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
                  style={{width: size + 5, height: size + 5}}
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