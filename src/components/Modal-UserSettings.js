import React from "react";
import classes from "./Modal-UserSettings.module.scss";
import { Button } from "../styleComponents/ButtonStyleComp";
import globalStore from "../stores/global-store";

function ModalUserSettings({ openModalUser }) {
   const { toggleDarkMode, setColorTheme } = globalStore;

   return (
      <section className={classes.modal} onClick={() => openModalUser(false)}>
         <div
            className={classes.modalBox}
            onClick={(event) => event.stopPropagation()}
         >
            <div style={{ color: "black", fontWeight: "500" }}>
               Farb Einstellungen
            </div>
            <button onClick={toggleDarkMode}>Dark Modus</button>
            <label className={classes.farbThemaContainer}>
               Farb-Thema:
               <input
                  type="color"
                  className={classes.themeInput}
                  onChange={(event) => setColorTheme(event.target.value)}
               />
            </label>
            <Button name="Schließen" onClick={() => openModalUser(false)} />
         </div>
      </section>
   );
}

export default ModalUserSettings;
