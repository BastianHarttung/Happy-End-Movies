import classes from "./WrongUrl.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../models/routes";

function WrongUrl() {
  return (
    <section className={classes.wrongUrlSection}>
      <h1>404</h1>
      <p>Falsche Url</p>
      <Link to={ROUTES.LOGIN}>Gehe zu Login</Link>
    </section>
  );
}

export default WrongUrl;