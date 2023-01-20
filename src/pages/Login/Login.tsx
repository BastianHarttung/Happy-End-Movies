import classes from "./Login.module.scss";
import React, { useEffect, useState } from "react";
import LoginForm from "./login-components/login-form";
import RegisterForm from "./login-components/register-form";
import HappyLogo from "../../assets/logos/Happy-End_logo-mit-Text.svg";
import { ROUTES } from "../../models/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [register, setRegister] = useState<boolean>(false);

  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(firebaseAuth);

  console.log(user);

  useEffect(() => {
    if (loading || error) return;
    if (user) navigate(ROUTES.START);
  }, [user, loading]);

  return (
    <section className={classes.loginSection}>
      <div className={classes.loginBoxContainer}>
        <div className={classes.header}>
          <img src={HappyLogo} className={classes.happyLogo} alt="Logo" />
        </div>

        <div className={classes.loginSwitchHeader}>
          <div className={classes.loginSwitch}>
            <div
              className={`${classes.loginBtn} ${
                register ? "" : classes.active
              }`}
              onClick={() => setRegister(false)}
            >
              Login
            </div>
            <div
              className={`${classes.loginBtn} ${
                register ? classes.active : ""
              }`}
              onClick={() => setRegister(true)}
            >
              Registrierung
            </div>
          </div>

          <div
            className={`${classes.activeLine} ${
              register ? classes.register : ""
            }`}
          />

          <hr className={classes.line} />
        </div>

        <div
          className={`${classes.loginMainContainer} ${
            register ? classes.register : ""
          }`}
        >
          <LoginForm />

          <RegisterForm />
        </div>
      </div>
    </section>
  );
}

export default Login;
