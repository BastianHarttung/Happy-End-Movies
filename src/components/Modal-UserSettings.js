import React, {useState} from 'react';
import classes from "./Modal-UserSettings.module.scss";
import {Button} from "../styleComponents/ButtonStyleComp";

function ModalUserSettings({openModalUser, propDarkMode, appDarkMode}) {

    const [darkMode, setDarkMode] = useState(propDarkMode)

    return (
        <section className={classes.modal}
                 onClick={() => openModalUser(false)}>
            <div className={classes.modalBox}
                 onClick={(event) => event.stopPropagation()}>
                <div style={{color: "black", fontWeight: "500"}}>Color Settings</div>
                <button onClick={changeDarkMode}>DarkMode</button>
                <button>Theme</button>
                <Button name="Schließen"
                        onClick={() => openModalUser(false)}/>
            </div>
        </section>
    );

    function changeDarkMode() {
        setDarkMode(!darkMode);
        appDarkMode(!darkMode);
    }

}

export default ModalUserSettings;