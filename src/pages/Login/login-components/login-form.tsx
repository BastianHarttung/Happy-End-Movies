import classes from "./login-form.module.scss";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InputString from "../../../styleComponents/input-string";
import { Button } from "../../../styleComponents/button";
import useInput from "../../../hooks/useInput";
//Icons
import MailIcon from "../../../assets/icons/envelope.svg";
import globalStore from "../../../stores/global-store";
import { ROUTES } from "../../../models/routes";
//Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../../firebase-config";

const LoginForm = () => {
  const navigate = useNavigate();

  const [user, loading, error] = useAuthState(firebaseAuth);

  const {
    logInWithEmailAndPassword,
    openModalPasswordReset,
    signInWithGoogle,
  } = globalStore;

  const {
    value: emailValue,
    isValid: emailIsValid,
    showError: emailShowError,
    changeValue: changeEmail,
    handleBlur: blurEmail,
    isDirty: isDirtyEmail,
  } = useInput((value) => value.includes("@"), "");

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    showError: passwordShowError,
    changeValue: changePassword,
    handleBlur: blurPassword,
    isDirty: isDirtyPassword,
  } = useInput((value) => value.length >= 8, "");

  const formIsValid = emailIsValid && passwordIsValid;

  const handleTestLoginClick = () => {
    changeEmail("rainer.zufall@testmail.de");
    changePassword("test1234");
  };

  const submitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("login");
    logInWithEmailAndPassword(emailValue, passwordValue)
      .then(() => navigate(ROUTES.START))
      .catch(() => console.log("fail"));
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate(ROUTES.START);
  }, [user, loading]);

  return (
    <form onSubmit={submitLoginHandler} className={classes.loginInputContainer}>
      <InputString
        placeholder="Email..."
        value={emailValue}
        changeInput={changeEmail}
        showError={emailShowError}
        isDirty={isDirtyEmail}
        handleBlur={blurEmail}
        type="email"
        icon={MailIcon}
        style={{ width: "224px" }}
      />

      <InputString
        placeholder="Passwort..."
        value={passwordValue}
        changeInput={changePassword}
        showError={passwordShowError}
        isDirty={isDirtyPassword}
        handleBlur={blurPassword}
        style={{ width: "224px" }}
        type="password"
      />

      <Button
        name="Login"
        type="submit"
        className={classes.loginButton}
        onClick={() => {}}
        disabled={!formIsValid}
      />

      <Button
        name="Passwort vergessen?"
        buttonStyle="third"
        onClick={openModalPasswordReset}
      />
      <Button
        name="Testdaten für Login"
        buttonStyle="third"
        onClick={handleTestLoginClick}
      />

      <Button
        name="Mit Google einloggen"
        buttonStyle="secondary"
        onClick={signInWithGoogle}
      />
    </form>
  );
};

export default LoginForm;
