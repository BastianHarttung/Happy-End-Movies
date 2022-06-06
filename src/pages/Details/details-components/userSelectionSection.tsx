import React, {useState} from 'react';
import classes from "./userSelectionSection.module.scss";
import {FaMeh, FaRegEye, FaRegEyeSlash, FaSadTear, FaSmileBeam} from "react-icons/fa";
import {THasHappyEnd, TUserSelections} from "../../../interfaces/types";
import {IMovieAllInfos, ITvAllInfos, IUserSelections} from "../../../interfaces/interfaces";
import globalStore from "../../../stores/global-store";
import {Button} from "../../../styleComponents/ButtonStyleComp";
import {useNavigate} from "react-router-dom";
import apiStore from "../../../stores/api-store";
import {observer} from "mobx-react";

interface IUserSelectionSectionProps {
  selectedMedia: IMovieAllInfos | ITvAllInfos;
  classNameContent?: string;
}

const UserSelectionSection = ({selectedMedia, classNameContent}: IUserSelectionSectionProps) => {

  const {user} = globalStore;
  const {saveMovieToDb} = apiStore;

  const navigate = useNavigate();

  const [userSelection, setUserSelection] = useState<IUserSelections>({
    [user.userId]: {happyEnd_Voting: "neutral", haveSeen: false},
  });

  return (
    <div className={`${classes.userSelectionContainer} ${classNameContent}`}>
      <div>
        <div className={classes.gesehen}>Schon gesehen?</div>
        <div className={classes.eyes}>
          <FaRegEye
            onClick={() => handleClickUserSelection("haveSeen", true)}
            className={
              userSelection[user.userId].haveSeen
                ? classes.eyeGreen
                : classes.eye
            }
          />
          <FaRegEyeSlash
            onClick={() => handleClickUserSelection("haveSeen", false)}
            className={
              userSelection[user.userId].haveSeen
                ? classes.eyeRed
                : classes.eye
            }
          />
        </div>
      </div>

      {userSelection[user.userId].haveSeen && (
        <div>
          <div className={classes.happyEnd}>Dein Happy End ?</div>

          <div className={classes.smileys}>
            <FaSmileBeam
              onClick={() => handleClickUserSelection("happyEnd_Voting", "true")}
              className={
                userSelection[user.userId].happyEnd_Voting === "true"
                  ? classes.smileyLaugh
                  : classes.smiley
              }
            ></FaSmileBeam>
            <FaMeh
              onClick={() => handleClickUserSelection("happyEnd_Voting", "neutral")}
              className={
                userSelection[user.userId].happyEnd_Voting === "neutral"
                  ? classes.smileyNeutral
                  : classes.smiley
              }
            ></FaMeh>
            <FaSadTear
              onClick={() => handleClickUserSelection("happyEnd_Voting", "false")}
              className={
                userSelection[user.userId].happyEnd_Voting === "false"
                  ? classes.smileySad
                  : classes.smiley
              }
            ></FaSadTear>
          </div>
        </div>
      )}

      <Button
        name="In Datenbank speichern und zum Showroom"
        fontSize={1}
        onClick={saveMediaInDB}
      />
    </div>
  );

  //Change state for User Selection
  function handleClickUserSelection(name: TUserSelections, state: boolean | THasHappyEnd): void {
    setUserSelection({[user.userId]: {...userSelection[user.userId], [name]: state}})
  }

  function saveMediaInDB() {
    const mediaForDB = {...selectedMedia, userSelections: userSelection};
    saveMovieToDb(mediaForDB)
      .then(() => navigate("/showroom"))
  }

};

export default observer(UserSelectionSection);
