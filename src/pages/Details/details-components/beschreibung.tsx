import React from 'react';
import classes from "../DetailsMovie.module.scss";

interface IBeschreibungProps {
  tagline: string,
  overview: string,
}

const Beschreibung = ({tagline, overview}: IBeschreibungProps): JSX.Element => {
  return (
    <div>
      {tagline && (
        <h3 className={classes.subtitle}>{tagline}</h3>
      )}
      {overview && (
        <div className={classes.description}>
          <b>Beschreibung:</b> {overview}
        </div>
      )}
    </div>
  );
};

export default Beschreibung;
