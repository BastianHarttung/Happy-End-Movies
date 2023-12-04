import classes from "./SearchBar.module.scss";
import React, { useEffect } from "react";
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

  /**
   * Listen if the Enter-Button is pressed
   */
  function keyPressEvent(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      searchMovie(value);
    }
  }

  // Debouncing to only start searching after a typing delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!!value.trim()) {
        console.log("Searching...");
        searchMovie(value.trim());
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [value, searchMovie]);

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
};

export default SearchBar;
