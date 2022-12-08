import React from 'react';
import classes from "./register-form.module.scss";
import InputString from "../../../styleComponents/input-string";
import {Button} from "../../../styleComponents/button";
import useInput from "../../../hooks/useInput";

const RegisterForm = () => {
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

  const formIsValid = nameIsValid && emailIsValid && passwordIsValid && pwconfirmIsValid

  const submitRegisterHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("register")
  }


  return (
    <form onSubmit={submitRegisterHandler} className={classes.registerInputContainer}>
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


      <InputString
        placeholder="Passwort bestätigen..."
        value={pwconfirmValue}
        changeInput={changePwconfirm}
        showError={pwconfirmShowError}
        isDirty={isDirtyPwconfirm}
        handleBlur={blurPwconfirm}
        style={{width: "224px"}}
        type="password"
      />

      <Button name="Registrierung"
              type="submit"
              className={classes.loginButton}
              onClick={() => {
              }}
              disabled={!formIsValid}
      />

    </form>
  );
};

export default RegisterForm;
