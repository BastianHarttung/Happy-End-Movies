import React, {useState} from "react";
import classes from "./Login.module.scss";
import {ReactComponent as HappyLogo} from "../assets/logos/Happy-End_logo-mit-Text.svg";
import {Button} from "../styleComponents/button";
import {Link} from "react-router-dom";
import {ROUTES} from "../models/routes";
import InputString from "../styleComponents/input-string";

function Login() {

  const [register, setRegister] = useState<boolean>(false);

  const changeNameHandler = (newValue: string) => {
    console.log(newValue)
  }
  const changeEmailHandler = (newValue: string) => {
    console.log(newValue)
  }
  const changePasswordHandler = (newValue: string) => {
    console.log(newValue)
  }
  const changePwConfirmHandler = (newValue: string) => {
    console.log(newValue)
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

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

        <form onSubmit={submitHandler} className={classes.loginInputContainer}>

          <InputString onChange={changeNameHandler}
                       placeholder="Name..."/>

          <InputString onChange={changeEmailHandler}
                       placeholder="Email..."
                       type="email"/>

          <InputString onChange={changePasswordHandler}
                       placeholder="Passwort..."
                       type="password"/>

          {register && <InputString onChange={changePwConfirmHandler}
                                    placeholder="Passwort bestätigen..."
                                    type="password"/>}

          {/*<input type="text"*/}
          {/*       placeholder="Name"*/}
          {/*       value={name}*/}
          {/*       onChange={changeName}*/}
          {/*       onBlur={nameBlur}*/}
          {/*/>*/}
          {/*<input type="email"*/}
          {/*       placeholder="Email"/>*/}
          {/*<input type="password"*/}
          {/*       placeholder="Passwort"/>*/}
          {/*{register && <input type="password"*/}
          {/*                    placeholder="Passwort bestätigen"/>}*/}
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
      </Link>

    </section>
  );
}

export default Login;