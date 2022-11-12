import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import icons_search_light from "../../assets/icons/search_light.svg";
import icon_projector from "../../assets/icons/projector_light.svg";
import classes from "./Navigation.module.scss";
import iconSignout from "../../assets/icons/sign-out-alt_light.svg";
import {IoSettingsOutline} from "react-icons/all";
import globalStore from "../../stores/global-store";
import {observer} from "mobx-react";
import {ROUTES} from "../../models/routes";

interface INavigationProps {
  isHandy: boolean,
}

const Navigation = ({isHandy}: INavigationProps) => {
  const location = useLocation()

  const filmsucheClasses = `${classes.navLinkContainer} ${location.pathname === ROUTES.FILMSUCHE ? classes.active : ""}`
  const showroomClasses = `${classes.navLinkContainer} ${location.pathname === ROUTES.SHOWROOM ? classes.active : ""}`

  return (
    <nav>

      <Link to={ROUTES.FILMSUCHE} className={filmsucheClasses}>
        <div className={classes.linkContainer}>
          {!isHandy && <div>Filmsuche</div>}
          <img
            src={icons_search_light}
            alt="filmsuche"
            className={classes.icons}
          />
        </div>
      </Link>

      <Link to={ROUTES.SHOWROOM} className={showroomClasses}>
        <div className={classes.linkContainer}>
          {!isHandy && <div>Showroom</div>}
          <img
            src={icon_projector}
            alt="showroom"
            className={classes.icons}
          />
        </div>
      </Link>

    </nav>
  );
};

export default Navigation;
