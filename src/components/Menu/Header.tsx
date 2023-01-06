import classes from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import Navigation from "./Navigation";
import Logout from "./Logout";
import HappyLogo from "../../assets/logos/Happy-End_logo-mit-Text.svg";

const Header = () => {
  const [isHandy, setIsHandy] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 800) setIsHandy(true);
    else setIsHandy(false);
  }, []);

  return (
    <header className={classes.header}>
      {!isHandy && (
        <Link to="/start" className={classes.headerLogoLink}>
          <img src={HappyLogo} alt="Logo" className={classes.happyLogo} />
        </Link>
      )}

      <Navigation isHandy={isHandy} />

      <Logout isHandy={isHandy} />
    </header>
  );
};

export default observer(Header);
