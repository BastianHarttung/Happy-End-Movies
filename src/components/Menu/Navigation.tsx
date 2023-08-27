import { NavLink } from "react-router-dom";
import icons_search_light from "../../assets/icons/search_light.svg";
import icon_projector from "../../assets/icons/projector_light.svg";
import classes from "./Navigation.module.scss";
import { ROUTES } from "../../models/routes";

interface INavigationProps {
  isHandy: boolean;
}

const Navigation = ({ isHandy }: INavigationProps) => {
  return (
    <nav>
      <NavLink
        to={ROUTES.FILMSUCHE}
        className={({ isActive }) =>
          `${classes.navLinkContainer} ${isActive && classes.active}`
        }
      >
        <div className={classes.linkContainer}>
          {!isHandy && <div>Filmsuche</div>}
          <img
            src={icons_search_light}
            alt="filmsuche"
            className={classes.icons}
          />
        </div>
      </NavLink>

      <NavLink
        to={ROUTES.SHOWROOM}
        className={({ isActive }) =>
          `${classes.navLinkContainer} ${isActive && classes.active}`
        }
      >
        <div className={classes.linkContainer}>
          {!isHandy && <div>Showroom</div>}
          <img src={icon_projector} alt="showroom" className={classes.icons} />
        </div>
      </NavLink>
    </nav>
  );
};

export default Navigation;
