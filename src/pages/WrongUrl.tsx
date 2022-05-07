import React from "react";
import classes from "./WrongUrl.module.scss";

function WrongUrl() {
  return (
    <section className={classes.wrongUrlSection}>
      <h1>404</h1>
      <p>Falsche Url</p>
    </section>
  );
}

export default WrongUrl;