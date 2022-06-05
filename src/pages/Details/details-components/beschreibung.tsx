import React from 'react';
import classes from "./beschreibung.module.scss";

interface IBeschreibungProps {
  tagline: string,
  overview: string,
  className?: string
}

const Beschreibung = ({tagline, overview, className}: IBeschreibungProps): JSX.Element => {
  return (
    <div className={`${classes.beschreibungContainer} ${className}`}>
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
