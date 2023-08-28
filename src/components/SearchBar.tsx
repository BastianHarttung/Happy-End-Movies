import classes from "./SearchBar.module.scss";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { TCategorySearch } from "../models/types";

interface ISearchBarProps {
  value: string;
  length: number;
  size?: number;
  searchMovie: (movieName: string, searchCategory?: TCategorySearch) => void;
  saveSearchFor: (movieName: string) => void;
}

const SearchBar = ({
  value,
  length,
  size = 50,
  searchMovie,
  saveSearchFor,
}: ISearchBarProps) => {
  // const locationHashString: string = window.location.hash
  //   .substring(1)
  //   .split("%20")
  //   .join(" ");
  // const [movieName, setMovieName] = useState<string>(locationHashString);

  // Debouncing to only start searching after a typing delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!!value.trim()) {
        console.log("Searching...");
        searchMovie(value.trim());
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={classes.searchBarContainer}>
      <div className={classes.searchContainer}>
        <input
          className={classes.searchInput}
          style={{ fontSize: size + "px" }}
          type="search"
          size={length}
          placeholder="Suche"
          value={value}
          onKeyPress={(event) => keyPressEvent(event)}
          onChange={(e) => saveSearchFor(e.target.value)}
        />

        <FaSearch
          onClick={() => searchMovie(value)}
          style={{ width: size + 5, height: size + 5 }}
          className={classes.searchButton}
        />
      </div>
    </div>
  );

  /**
   * Listen if the Enter-Button is pressed
   */
  function keyPressEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      searchMovie(value);
    }
  }
};

export default SearchBar;
