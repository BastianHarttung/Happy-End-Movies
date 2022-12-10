import React, {useState} from "react";
import classes from "./Login.module.scss";
import {ReactComponent as HappyLogo} from "../../assets/logos/Happy-End_logo-mit-Text.svg";
import LoginForm from "./login-components/login-form";
import RegisterForm from "./login-components/register-form";
import {Link} from "react-router-dom";
import {ROUTES} from "../../models/routes";
import {Button} from "../../styleComponents/button";

function Login() {

  const [register, setRegister] = useState<boolean>(false);


  return (
    <section className={classes.loginSection}>
      <div className={classes.loginBoxContainer}>

        <div className={classes.header}>
          <HappyLogo className={classes.happyLogo}/>
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