import React, {useEffect, useState} from 'react';
import classes from "./castAndCrew.module.scss";
import {FaChevronLeft, FaChevronRight, FaSearch} from "react-icons/fa";
import PersonBox from "./personBox";
import {ICastMovie, ICastTv, ICrewMovie, ICrewTv} from "../../../interfaces/interfaces";

interface ICastAndCrewProps {
  castAndCrew: ((ICrewMovie | ICastMovie)[]) | ((ICrewTv | ICastTv)[]);
  classNameContent?: string;
}

const CastAndCrew = ({castAndCrew, classNameContent}: ICastAndCrewProps) => {

  const [scrollActors, setScrollActors] = useState<number>(0);
  const [scrollWidth, setScrollWidth] = useState<number>(100);

  const [searchActor, setSearchActor] = useState<string>("");

  const [filteredActors, setFilteredActors] = useState<((ICrewMovie | ICastMovie)[]) | ((ICrewTv | ICastTv)[])>(castAndCrew);

  useEffect(() => {
    setScrollWidth(getScrollWidth());
  }, []);

  return (
    <div className={`${classes.actorSearchContainer} ${classNameContent}`}>
      {scrollActors > 0 ? (
        <FaChevronLeft
          onClick={() => scrollLeft()}
          className={classes.arrowBtnLeft}
        ></FaChevronLeft>
      ) : (
        ""
      )}

      {scrollActors < scrollWidth ? (
        <FaChevronRight
          onClick={() => scrollRight()}
          className={classes.arrowBtnRight}
        ></FaChevronRight>
      ) : (
        ""
      )}

      <div className={classes.searchContainer}>
        <FaSearch
          className={classes.searchBtn}
          onClick={() => searchForActor(searchActor)}
        />
        <input
          type="text"
          placeholder="Suche Schauspieler oder Rolle"
          className={classes.searchInput}
          value={searchActor}
          onChange={(e) => setSearchActor(e.target.value)}
          onKeyPress={keyPressEvent}
        />
        <div className={classes.lengthActors}>
          (Gesamt: {castAndCrew.length} Schauspieler)
        </div>
      </div>

      <div id="actorContainer" className={classes.actorContainer}>
        {castAndCrew
          ? filteredActors.map((actor, index) => (
            <PersonBox
              key={index}
              person={actor}
            />
          ))
          : ""}
      </div>
    </div>
  );

  //Searching and Filtering For Actor
  function searchForActor(actorSearch: string) {
    const actorSearchLow = actorSearch.toLowerCase();
    if (actorSearch === "") {
      console.log("alle actors anzeigen");
      setFilteredActors(castAndCrew);
    } else {
      console.log("suche nach " + actorSearch);
      // setFilteredActors(
      //   castAndCrew.filter((actor: (ICrewMovie | ICastMovie) | (ICrewTv | ICastTv)) => {
      //     if (actor.character) {
      //       return (
      //         actor.name.toLowerCase().includes(actorSearchLow) ||
      //         actor.character.toLowerCase().includes(actorSearchLow)
      //       );
      //     } else {
      //       let actorCharacter = false;
      //       // for (let role of actor.roles) {   TODO
      //       //   if (
      //       //     role.character.toLowerCase().includes(actorSearchLow)
      //       //   ) {
      //       //     actorCharacter = true;
      //       //   }
      //       // }
      //       return (
      //         actor.name.toLowerCase().includes(actorSearchLow) ||
      //         actorCharacter
      //       );
      //     }
      //   })
      // );
    }
  };

  //Listen if the Enter-Button is pressed
  function keyPressEvent(event: any) {
    if (event.key === "Enter") {
      searchForActor(searchActor);
    }
  };

  //Set Scroll Width
  function getScrollWidth(): number {
    const actorContainer = document.getElementById("actorContainer");
    if (!!actorContainer) return actorContainer.scrollWidth - actorContainer.offsetWidth
    else return 0
  };

  //Scroll Actors Right
  function scrollRight(): void {
    const actorContainer = document.getElementById("actorContainer");
    if (!!actorContainer) {
      const scrollWidth = scrollActors + actorContainer.offsetWidth - 100;
      if (scrollActors < actorContainer.scrollWidth) {
        actorContainer.scroll(scrollWidth, 0);
        setScrollActors(scrollWidth);
      }
    }
  };

  //Scroll Actors Left
  function scrollLeft(): void {
    const actorContainer = document.getElementById("actorContainer");
    if (!!actorContainer) {
      const scrollWidth = scrollActors - actorContainer.offsetWidth + 100;
      if (scrollActors > 0) {
        actorContainer.scroll(scrollWidth, 0);
        setScrollActors(scrollWidth);
      }
    }
  };

};

export default CastAndCrew;
