import classes from "./Logout.module.scss";
import {IoSettingsOutline} from "react-icons/all";
import {Link} from "react-router-dom";
import iconSignout from "../../assets/icons/sign-out-alt_light.svg";
import globalStore from "../../stores/global-store";
import {observer} from "mobx-react";
import {ROUTES} from "../../models/routes";


interface ILogoutProps {
  isHandy: boolean,
}

const Logout = ({isHandy}: ILogoutProps) => {

  const {user, openUserSettingsModal} = globalStore;


  return (
    <div className={classes.logoutLinkContainer}>

      <div
        className={classes.userContainer}
        onClick={openUserSettingsModal}
      >
        {!isHandy && <div className={classes.username}>{user.name}</div>}
        <IoSettingsOutline className={classes.settingsIcon}/>
      </div>

      <Link to={ROUTES.LOGIN} className={classes.logoutLink}>
        <div className={classes.linkContainer}>
          {!isHandy && <div>Logout</div>}
          <img src={iconSignout}
               alt="Logout"
               className={classes.icons}/>
        </div>
      </Link>

    </div>
  )
}

export default observer(Logout)