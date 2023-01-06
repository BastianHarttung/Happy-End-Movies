import classes from "./Login.module.scss";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import LoginForm from "./login-components/login-form";
import RegisterForm from "./login-components/register-form";
import {ROUTES} from "../../models/routes";
import {Button} from "../../styleComponents/button";
import HappyLogo from "../../assets/logos/Happy-End_logo-mit-Text.svg";

function Login() {

  const [register, setRegister] = useState<boolean>(false);


  return (
    <section className={classes.loginSection}>
      <div className={classes.loginBoxContainer}>

        <div className={classes.header}>
          <img src={HappyLogo} className={classes.happyLogo} alt="Logo" />
        </div>

        <div className={classes.loginSwitchHeader}>
          <div className={classes.loginSwitch}>
            <div className={`${classes.loginBtn} ${register ? "" : classes.active}`}
                 onClick={() => setRegister(false)}>Login
            </div>
            <div className={`${classes.loginBtn} ${register ? classes.active : ""}`}
                 onClick={() => setRegister(true)}>Registrierung
            </div>
          </div>

          <div className={`${classes.activeLine} ${register ? classes.register : ""}`}/>

          <hr className={classes.line}/>
        </div>

        <div className={`${classes.loginMainContainer} ${register ? classes.register : ""}`}>

          <LoginForm/>

          <RegisterForm/>

        </div>

      </div>

      <Link to={ROUTES.START}>
        <Button name="Gast-Zugang"
                buttonStyle="secondary"
                onClick={() => {
                }}/>
      </Link>

    </section>
  );
}

export default Login;