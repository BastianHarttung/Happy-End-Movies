import classes from "./register-form.module.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputString } from "../../../styleComponents";
import useInput from "../../../hooks/useInput";
//Icons
import UserIcon from "../../../assets/icons/user-alt.svg";
import MailIcon from "../../../assets/icons/envelope.svg";
import { ROUTES } from "../../../models/routes";
import globalStore from "../../../stores/global-store";


const RegisterForm = () => {
  const navigate = useNavigate();

  const { registerWithEmailAndPassword } = globalStore;

  const {
    value: nameValue,
    isValid: nameIsValid,
    showError: nameShowError,
    changeValue: changeName,
    handleBlur: blurName,
    isDirty: isDirtyName,
  } = useInput((value) => !!value.trim(), "");

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

  const {
    value: pwconfirmValue,
    isValid: pwconfirmIsValid,
    showError: pwconfirmShowError,
    changeValue: changePwconfirm,
    handleBlur: blurPwconfirm,
    isDirty: isDirtyPwconfirm,
  } = useInput((value) => value === passwordValue, "");

  const formIsValid =
    nameIsValid && emailIsValid && passwordIsValid && pwconfirmIsValid;

  const submitRegisterHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerWithEmailAndPassword(nameValue, emailValue, passwordValue)
      .then(() => navigate(ROUTES.START))
      .catch(() => console.log("fail"));
  };

  return (
    <form
      onSubmit={submitRegisterHandler}
      className={classes.registerInputContainer}
    >
      <InputString
        placeholder="Name..."
        value={nameValue}
        changeInput={changeName}
        showError={nameShowError}
        isDirty={isDirtyName}
        handleBlur={blurName}
        icon={UserIcon}
        style={{ width: "224px" }}
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

      <InputString
        placeholder="Passwort bestätigen..."
        value={pwconfirmValue}
        changeInput={changePwconfirm}
        showError={pwconfirmShowError}
        isDirty={isDirtyPwconfirm}
        handleBlur={blurPwconfirm}
        style={{ width: "224px" }}
        type="password"
      />

      <Button
        name="Registrierung"
        type="submit"
        className={classes.loginButton}
        onClick={() => {}}
        disabled={!formIsValid}
      />
    </form>
  );
};

export default RegisterForm;
