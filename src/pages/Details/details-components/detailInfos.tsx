import classes from "./detailInfos.module.scss";
import React from "react";
import { imageUrlBig } from "../../../constants";
import { FaMeh, FaSadTear, FaSmileBeam } from "react-icons/fa";
import emptyImage from "../../../assets/img/movie-poster.png";
import FSK0Logo from "../../../assets/img/FSK_0.svg";
import FSK6Logo from "../../../assets/img/FSK_6.svg";
import FSK12Logo from "../../../assets/img/FSK_12.svg";
import FSK16Logo from "../../../assets/img/FSK_16.svg";
import FSK18Logo from "../../../assets/img/FSK_18.svg";
import { TCategoryMedia, THasHappyEnd } from "../../../models/types";
import { EHasHappyEnd } from "../../../models/enums";
import { IGenre, TStatus } from "../../../models/interfaces/interfaces";
import VotingRing from "./votingRing";

interface IDetailInfosProps {
  category: TCategoryMedia;
  title: string;
  posterPath: string;
  backdropPath: string;
  hasHappyEnd: THasHappyEnd | null;
  fsk: number;
  releaseDate: string;
  runtime: number;
  genres: IGenre[];
  voteAverage: number;
  staffeln?: number;
  folgen?: number;
  status: TStatus;
  classNameContent?: string;
}

const DetailInfos = ({
  category,
  title,
  posterPath,
  hasHappyEnd,
  backdropPath,
  fsk,
  releaseDate,
  runtime,
  genres,
  voteAverage,
  staffeln,
  folgen,
  status,
  classNameContent,
}: IDetailInfosProps) => {
  const isTv = category === "tv";

  //Berechnet die Laufzeit in Stunden und Minuten
  const laufzeitInStunden = (
    laufzeit: number
  ): { stunden: number; minuten: number } => {
    const laufzeitStunden = Math.floor(laufzeit / 60);
    const restminuten = laufzeit - laufzeitStunden * 60;
    return { stunden: laufzeitStunden, minuten: restminuten };
  };

  const happyEndSmiley = () => {
    if (hasHappyEnd === EHasHappyEnd.TRUE)
      return (
        <FaSmileBeam
          className={classes.happyEndSmileyOverall}
          style={{ color: "var(--green)" }}
          title="Happy End"
        />
      );
    else if (hasHappyEnd === EHasHappyEnd.FALSE)
      return (
        <FaSadTear
          className={classes.happyEndSmileyOverall}
          style={{ color: "var(--red)" }}
          title="Kein Happy End"
        />
      );
    else if (hasHappyEnd === EHasHappyEnd.NEUTRAL)
      return (
        <FaMeh
          className={classes.happyEndSmileyOverall}
          style={{ color: "var(--orange)" }}
          title="Ende neutral"
        />
      );
    else
      return (
        <FaMeh
          className={classes.happyEndSmileyOverall}
          style={{ color: "var(--gray)" }}
          title="Kein Voting vorhanden"
        />
      );
  };

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
            <div className="d-flex-row gap-4">
              {fsk <= 100 && (
                <div className={classes.fskInfo}>
                  <img
                    src={
                      fsk === 0
                        ? FSK0Logo
                        : fsk === 6
                        ? FSK6Logo
                        : fsk === 12
                        ? FSK12Logo
                        : fsk === 16
                        ? FSK16Logo
                        : fsk === 18
                        ? FSK18Logo
                        : ""
                    }
                    className={classes.fsk}
                    alt={fsk.toString()}
                    title={`FSK ${fsk}`}
                  />
                </div>
              )}

              <p className={classes.releaseYear}>{releaseDate.slice(0, 4)}</p>

              <p>
                {isTv && <span>Folge: ca. </span>}
                <span>{runtime} min </span>
                {runtime >= 60 && (
                  <span>
                    ({laufzeitInStunden(runtime).stunden} Std.{" "}
                    {laufzeitInStunden(runtime).minuten} min.)
                  </span>
                )}
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

            {isTv && (
              <>
                <div>Staffeln: {staffeln}</div>
                <div>Folgen: {folgen}</div>
              </>
            )}
            <p>
              <b>Status:</b> {status ? translateStatus(status) : ""}
            </p>
          </div>

          <div className={`${classes["voting-container"]}`}>
            {voteAverage > 0 && (
              <VotingRing progress={Math.round(voteAverage * 10)} radius={35} />
            )}

            {happyEndSmiley()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfos;

function translateStatus(status: TStatus): string {
  return status === "Ended"
    ? "Beendet"
    : status === "Released"
    ? "Veröffentlicht"
    : status;
}
