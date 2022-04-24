import Navigation from "./Navigation";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as HappyLogo } from "../assets/logos/Happy-End_logo-mit-Text.svg";
import { useEffect, useState } from "react";
import globalStore from "../stores/global-store";
import { observer } from "mobx-react";

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
               <HappyLogo className={classes.happyLogo} />
            </Link>
         )}

         <Navigation isHandy={isHandy} />
      </header>
   );
};

export default observer(Header);
