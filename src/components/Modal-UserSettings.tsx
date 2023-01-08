import React from "react";
import {observer} from "mobx-react";
import {BsMoon, BsSun} from "react-icons/all";
import classes from "./Modal-UserSettings.module.scss";
import {Button} from "../styleComponents/button";
import globalStore from "../stores/global-store";

function ModalUserSettings() {
  const {
    darkMode,
    closeUserSettingsModal,
    toggleDarkMode,
    // setColorTheme,
  } = globalStore;

  return (
    <section className={classes.modal} onClick={closeUserSettingsModal}>
      <div
        className={classes.modalBox}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{color: "black", fontWeight: "500"}}>
          Farb Einstellungen
        </div>
        <div className={classes.darkmodeButton} onClick={toggleDarkMode}>
          <div
            className={classes.darkmodeSwitch}
            style={darkMode ? {left: "var(--size)"} : {left: "0px"}}
          />
          <BsSun/>
          <BsMoon/>
        </div>
        {/*<label className={classes.farbThemaContainer}>*/}
        {/*  Farb-Thema:*/}
        {/*  <input*/}
        {/*    type="color"*/}
        {/*    className={classes.themeInput}*/}
        {/*    onChange={(event) => setColorTheme(event.target.value)}*/}
        {/*  />*/}
        {/*</label>*/}
        <Button name="Schließen" onClick={closeUserSettingsModal}/>
      </div>
    </section>
  );
}

export default observer(ModalUserSettings);
