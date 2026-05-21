import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import { ReactComponent as HappyLogo } from "../assets/logos/Happy-End_logo-mit-Text.svg";
import { Button } from "../styleComponents/ButtonStyleComp";

function Login() {
   return (
      <section className={classes.loginSection}>
         <div className={classes.loginBoxContainer}>
            <div className={classes.header}>
               <HappyLogo className={classes.happyLogo} />
            </div>

            <div className={classes.loginInputContainer}>
               <input type="text" placeholder="Name" />
               <input type="email" placeholder="Email" />
               <input type="password" placeholder="Passwort" />
               <Button name={"Login"} />
            </div>
         </div>

         <Link to="/filmsuche">
            <Button name="Gast-Zugang" />
         </Link>
      </section>
   );
}

export default Login;
