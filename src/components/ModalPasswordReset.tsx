import classes from "./Modal-UserSettings.module.scss";
import React from "react";
import { observer } from "mobx-react";
import { Button } from "../styleComponents";
import globalStore from "../stores/global-store";


function ModalPasswordReset() {
  const { closeModalPasswordReset } = globalStore;

  return (
    <section className={classes.modal} onClick={closeModalPasswordReset}>
      <div
        className={classes.modalBox}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ color: "black", fontWeight: "500" }}>
          Passwort zurücksetzen?
        </div>

        <Button name="Schließen" onClick={closeModalPasswordReset} />
      </div>
    </section>
  );
}

export default observer(ModalPasswordReset);
