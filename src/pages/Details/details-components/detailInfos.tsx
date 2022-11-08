import React, {useState} from 'react';
import {imageUrlBig} from "../../../constants";
import classes from "./detailInfos.module.scss";
import {FaMeh, FaSadTear, FaSmileBeam} from "react-icons/fa";
import emptyImage from "../../../assets/img/movie-poster.png";
import {THasHappyEnd} from "../../../models/types";
import {EHasHappyEnd} from "../../../models/enums";
import VotingRing from "./votingRing";
import {IGenre} from "../../../models/interfaces/interfaces";

interface IDetailInfosProps {
  title: string;
  posterPath: string;
  backdropPath: string;
  hasHappyEnd?: THasHappyEnd;
  fsk: number;
  releaseDate: string;
  runtime: number;
  genres: IGenre[];
  voteAverage: number;
  classNameContent?: string;
}

const DetailInfos = ({
                       title,
                       posterPath,
                       hasHappyEnd,
                       backdropPath,
                       fsk,
                       releaseDate,
                       runtime,
                       genres,
                       voteAverage,
                       classNameContent,
                     }: IDetailInfosProps) => {

  return (
    <div className={classNameContent}>
      <img
        src={imageUrlBig + backdropPath}
        className={classes.backdropImage}
        alt="Backdrop"
      />

      <div className={`${classes.detailsContainer} ${classes.sectionContent}`}>
        <div className={classes.posterContainer}>
          <img
            className={classes.posterImage}
            src={posterPath ? imageUrlBig + posterPath : emptyImage}
            alt="Poster"
          />
        </div>

        <div className={classes.infoSection}>
          <div>
            <h2 className={classes.title}>{title}</h2>
            <div className="d-flex-row">
              {fsk <= 100 && (
                <div className={classes.fskInfo}>
                  <img
                    src={`https://altersfreigaben.de/images/rating/de/${fsk}_90.png`}
                    className={classes.fsk}
                    alt={fsk.toString()}
                    title={`FSK ${fsk}`}
                  />
                </div>
              )}

              <p className={classes.releaseYear}>
                {releaseDate.slice(0, 4)}
              </p>

              <p>
                {runtime} min (
                {laufzeitInStunden(runtime).stunden} Std.{" "}
                {laufzeitInStunden(runtime).minuten} min.)
              </p>
            </div>

            <div>
              <div className={classes.genres}>
                {genres.map((genre, index) => (
                  <div key={index} className={classes.genre}>
                    {genre.name}{" "}
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className={`${classes["voting-container"]}`}>

            {voteAverage > 0 && <VotingRing progress={Math.round(voteAverage * 10)}
                         radius={35}/>}

            {hasHappyEnd === EHasHappyEnd.TRUE ? (
              <FaSmileBeam
                className={classes.happyEndSmileyOverall}
                style={{color: "var(--green)"}}
                title="Happy End"
              />
            ) : hasHappyEnd === EHasHappyEnd.FALSE ? (
              <FaSadTear
                className={classes.happyEndSmileyOverall}
                style={{color: "var(--red)"}}
                title="Kein Happy End"
              />
            ) : hasHappyEnd === EHasHappyEnd.NEUTRAL ? (
              <FaMeh
                className={classes.happyEndSmileyOverall}
                style={{color: "var(--orange)"}}
                title="Neutral"
              />
            ) : (
              ""
            )}
          </div>

        </div>
      </div>
    </div>
  );

  //Berechnet die Laufzeit in Stunden und Minuten
  function laufzeitInStunden(laufzeit: number): { stunden: number, minuten: number } {
    const laufzeitStunden = Math.floor(laufzeit / 60);
    const restminuten = laufzeit - laufzeitStunden * 60;
    return {stunden: laufzeitStunden, minuten: restminuten};
  }

};

export default DetailInfos;
