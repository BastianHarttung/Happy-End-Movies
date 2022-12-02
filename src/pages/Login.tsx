import React, {useState} from "react";
import classes from "./Login.module.scss";
import {ReactComponent as HappyLogo} from "../assets/logos/Happy-End_logo-mit-Text.svg";
import {Button} from "../styleComponents/button";
import {Link} from "react-router-dom";
import {ROUTES} from "../models/routes";

function Login() {

  const [register, setRegister] = useState<boolean>(false);

  return (
    <section className={classes.loginSection}>
      <div className={classes.loginBoxContainer}>

        <div className={classes.header}>
          <HappyLogo className={classes.happyLogo}/>
        </div>

        <div className={classes.loginSwitchHeader}>
          <div onClick={() => setRegister(false)}>Login</div>
          <div onClick={() => setRegister(true)}>Registrierung</div>
        </div>

        <hr className={classes.line}/>

        <form className={classes.loginInputContainer}>
          <input type="text"
                 placeholder="Name"/>
          <input type="email"
                 placeholder="Email"/>
          <input type="password"
                 placeholder="Passwort"/>
          {register && <input type="password"
                              placeholder="Passwort bestätigen"/>}
          <Button name={register ? "Registrierung" : "Login"}
                  className={classes.loginButton}
                  onClick={() => {
                  }}/>
          {!register && <Button name="Testdaten für Login"
                               buttonStyle="third"
                               onClick={() => {
                               }}/>}

        </form>

      </div>

      <Link to={ROUTES.START}>
        <Button name="Gast-Zugang"
                onClick={() => {
                }}/>
        <Button name="Gast-Zugang secondary"
                buttonStyle="secondary"
                onClick={() => {
                }}/>
        <Button name="Gast-Zugang third"
                buttonStyle="third"
                onClick={() => {
                }}/>
      </Link>

    </section>
  );
}

export default Login;