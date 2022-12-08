import React from 'react';
import classes from "./login-form.module.scss";
import InputString from "../../../styleComponents/input-string";
import {Button} from "../../../styleComponents/button";
import useInput from "../../../hooks/useInput";
//Icons
import UserIcon from "../../../assets/icons/user-alt.svg"
import MailIcon from "../../../assets/icons/envelope.svg"

const LoginForm = () => {
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

  const formIsValid = nameIsValid && emailIsValid && passwordIsValid

  const handleTestLoginClick = () => {
    changeName("Rainer Zufall")
    changeEmail("rainer.zufall@test.de")
    changePassword("test1234")
  }

  const submitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("login")
  }


  return (
    <form onSubmit={submitLoginHandler} className={classes.loginInputContainer}>

      <InputString
        placeholder="Name..."
        value={nameValue}
        changeInput={changeName}
        showError={nameShowError}
        isDirty={isDirtyName}
        handleBlur={blurName}
        icon={UserIcon}
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
        icon={MailIcon}
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

      <Button name="Login"
              type="submit"
              className={classes.loginButton}
              onClick={() => {
              }}
              disabled={!formIsValid}
      />
      <Button name="Testdaten für Login"
              buttonStyle="third"
              onClick={handleTestLoginClick}
      />

    </form>
  );
};

export default LoginForm;
