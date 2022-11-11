import {Link} from "react-router-dom";
import icons_search_light from "../../assets/icons/search_light.svg";
import icon_projector from "../../assets/icons/projector_light.svg";
import classes from "./Navigation.module.scss";
import iconSignout from "../../assets/icons/sign-out-alt_light.svg";
import {IoSettingsOutline} from "react-icons/all";
import globalStore from "../../stores/global-store";
import {observer} from "mobx-react";

interface INavigationProps {
  isHandy: boolean,
}

const Navigation = ({isHandy}: INavigationProps) => {

  return (
    <nav>
      <Link to="/filmsuche" className={classes.navLinkContainer}>
        <div className={classes.linkContainer}>
          {!isHandy && <div>Filmsuche</div>}
          <img
            src={icons_search_light}
            alt="filmsuche"
            className={classes.icons}
          />
        </div>
      </Link>
      <Link to="/showroom" className={classes.navLinkContainer}>
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
