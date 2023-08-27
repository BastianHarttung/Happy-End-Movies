import classes from "./userSelectionSection.module.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import {
  FaMeh,
  FaRegEye,
  FaRegEyeSlash,
  FaSadTear,
  FaSmileBeam,
} from "react-icons/fa";
import { Button } from "../../../styleComponents";
import { IUserSelections } from "../../../models/interfaces/interfaces";
import globalStore from "../../../stores/global-store";
import databaseStore from "../../../stores/database-store";
import { EHasHappyEnd } from "../../../models/enums";
import { IMovieAllInfos } from "../../../models/interfaces/movie-interfaces";
import { ITvAllInfos } from "../../../models/interfaces/tv-interfaces";
import { ROUTES } from "../../../models/routes";
import { THasHappyEnd, TUserSelections } from "../../../models/types";


interface IUserSelectionSectionProps {
  selectedMedia: IMovieAllInfos | ITvAllInfos;
  classNameContent?: string;
}

const UserSelectionSection = ({
  selectedMedia,
  classNameContent,
}: IUserSelectionSectionProps) => {
  const { userData } = globalStore;
  const { saveMovieToDb } = databaseStore;

  const navigate = useNavigate();

  const [userSelection, setUserSelection] = useState<IUserSelections>({
    [userData?.userId || ""]: {
      happyEnd_Voting: "neutral",
      haveSeen: false,
    },
  });

  return (
    <div className={`${classes.userSelectionContainer} ${classNameContent}`}>
      <div>
        <div className={classes.gesehen}>Schon gesehen?</div>
        <div className={classes.eyes}>
          <FaRegEye
            onClick={() => handleClickUserSelection("haveSeen", true)}
            className={
              userSelection[userData?.userId || ""].haveSeen
                ? classes.eyeGreen
                : classes.eye
            }
          />
          <FaRegEyeSlash
            onClick={() => handleClickUserSelection("haveSeen", false)}
            className={
              userSelection[userData?.userId || ""].haveSeen
                ? classes.eye
                : classes.eyeRed
            }
          />
        </div>
      </div>

      {userSelection[userData?.userId || ""].haveSeen && (
        <div>
          <div className={classes.happyEnd}>Dein Happy End ?</div>

          <div className={classes.smileys}>
            <FaSmileBeam
              onClick={() =>
                handleClickUserSelection("happyEnd_Voting", EHasHappyEnd.TRUE)
              }
              className={
                userSelection[userData?.userId || ""].happyEnd_Voting ===
                EHasHappyEnd.TRUE
                  ? classes.smileyLaugh
                  : classes.smiley
              }
            ></FaSmileBeam>
            <FaMeh
              onClick={() =>
                handleClickUserSelection(
                  "happyEnd_Voting",
                  EHasHappyEnd.NEUTRAL
                )
              }
              className={
                userSelection[userData?.userId || ""].happyEnd_Voting ===
                EHasHappyEnd.NEUTRAL
                  ? classes.smileyNeutral
                  : classes.smiley
              }
            ></FaMeh>
            <FaSadTear
              onClick={() =>
                handleClickUserSelection("happyEnd_Voting", EHasHappyEnd.FALSE)
              }
              className={
                userSelection[userData?.userId || ""].happyEnd_Voting ===
                EHasHappyEnd.FALSE
                  ? classes.smileySad
                  : classes.smiley
              }
            ></FaSadTear>
          </div>
        </div>
      )}

      <Button
        name="In Datenbank speichern und zum Showroom"
        onClick={saveMediaInDB}
        style={{ fontSize: "1em" }}
      />
    </div>
  );

  //Change state for User Selection
  function handleClickUserSelection(
    name: TUserSelections,
    state: boolean | THasHappyEnd
  ): void {
    setUserSelection({
      [userData?.userId || ""]: {
        ...userSelection[userData?.userId || ""],
        [name]: state,
      },
    });
  }

  function saveMediaInDB() {
    const mediaForDB = { ...selectedMedia, userSelections: userSelection };
    saveMovieToDb(mediaForDB).then(() => navigate(ROUTES.SHOWROOM));
  }
};

export default observer(UserSelectionSection);
