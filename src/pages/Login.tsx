import React, {useState} from "react";
import classes from "./Login.module.scss";
import {ReactComponent as HappyLogo} from "../assets/logos/Happy-End_logo-mit-Text.svg";
import {Button} from "../styleComponents/ButtonStyleComp";
import {Link} from "react-router-dom";

function Login() {

  const [register, setRegister] = useState(false);

  return (
    <section className={classes.loginSection}>
      <div className={classes.loginBoxContainer}>
        <div className={classes.header}>
          <HappyLogo className={classes.happyLogo}/>
        </div>

        <div className={classes.loginInputContainer}>
          <input type="text"
                 placeholder="Name"/>
          <input type="email"
                 placeholder="Email"/>
          <input type="password"
                 placeholder="Passwort"/>
          {register && <input type="password"
                              placeholder="Passwort bestätigen"/>}
          <Button name={register ? "Register" : "Login"}
                  onClick={() => {
                  }}/>
        </div>
      </div>

      <Link to="/filmsuche">
        <Button name="Gast-Zugang"
                onClick={() => {
                }}/>
      </Link>

    </section>
  );
}

export default Login;