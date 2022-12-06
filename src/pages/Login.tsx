import React, {useState} from "react";
import classes from "./Login.module.scss";
import {ReactComponent as HappyLogo} from "../assets/logos/Happy-End_logo-mit-Text.svg";
import {Button} from "../styleComponents/button";
import InputString from "../styleComponents/input-string";
import useInput from "../hooks/useInput";

function Login() {

  const [register, setRegister] = useState<boolean>(false);

  const {
    value: nameValue,
    isValid: nameIsValid,
    showError: nameShowError,
    changeValue: changeName,
    handleBlur: blurName,
    isDirty: isDirtyName,
  } = useInput(
    (value) => !!value.trim(),
    ""
  );

  const {
    value: emailValue,
    isValid: emailIsValid,
    showError: emailShowError,
    changeValue: changeEmail,
    handleBlur: blurEmail,
    isDirty: isDirtyEmail,
  } = useInput(
    (value) => value.includes("@"),
    ""
  );

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    showError: passwordShowError,
    changeValue: changePassword,
    handleBlur: blurPassword,
    isDirty: isDirtyPassword,
  } = useInput(
    (value) => value.length >= 8,
    ""
  );

  const {
    value: pwconfirmValue,
    isValid: pwconfirmIsValid,
    showError: pwconfirmShowError,
    changeValue: changePwconfirm,
    handleBlur: blurPwconfirm,
    isDirty: isDirtyPwconfirm,
  } = useInput(
    (value) => value === passwordValue,
    ""
  );

  const formIsValid = nameIsValid && emailIsValid && passwordIsValid && (register ? pwconfirmIsValid : true)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleTestLoginClick = ()=>{
    changeName("Rainer Zufall")
    changeEmail("rainer.zufall@test.de")
    changePassword("test1234")
  }

  // useEffect(() => {
  //   changeName({target: {value: `${initialValue}`}} as React.ChangeEvent<HTMLInputElement>);
  // }, []);

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

          <InputString
            placeholder="Name..."
            value={nameValue}
            changeInput={changeName}
            showError={nameShowError}
            isDirty={isDirtyName}
            handleBlur={blurName}
            style={{width: "224px"}}
          />

          <InputString
            placeholder="Email..."
            value={emailValue}
            changeInput={changeEmail}
            showError={emailShowError}
            isDirty={isDirtyEmail}
            handleBlur={blurEmail}
            type="email"
            style={{width: "224px"}}
          />

          <InputString
            placeholder="Passwort..."
            value={passwordValue}
            changeInput={changePassword}
            showError={passwordShowError}
            isDirty={isDirtyPassword}
            handleBlur={blurPassword}
            style={{width: "224px"}}
            type="password"
          />

          {register && (
            <InputString
              placeholder="Passwort bestätigen..."
              value={pwconfirmValue}
              changeInput={changePwconfirm}
              showError={pwconfirmShowError}
              isDirty={isDirtyPwconfirm}
              handleBlur={blurPwconfirm}
              style={{width: "224px"}}
              type="password"
            />)}

          <Button name={register ? "Registrierung" : "Login"}
                  className={classes.loginButton}
                  onClick={() => {
                  }}
                  disabled={!formIsValid}
          />
          {!register && <Button name="Testdaten für Login"
                                buttonStyle="third"
                                onClick={handleTestLoginClick}/>}

        </form>

      </div>

      {/*<Link to={ROUTES.START}>*/}
      {/*  <Button name="Gast-Zugang"*/}
      {/*          onClick={() => {*/}
      {/*          }}/>*/}
      {/*</Link>*/}

    </section>
  );
}

export default Login;