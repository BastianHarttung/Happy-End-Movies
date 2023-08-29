import classes from "./Logout.module.scss";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { IoSettingsOutline } from "react-icons/all";
import iconSignout from "../../assets/icons/sign-out-alt_light.svg";
import globalStore from "../../stores/global-store";
import { ROUTES } from "../../models/routes";

interface ILogoutProps {
  isHandy: boolean;
}

const Logout = ({ isHandy }: ILogoutProps) => {
  const { userData, openUserSettingsModal, logout } = globalStore;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => navigate(ROUTES.LOGIN));
  };

  return (
    <div className={classes.logoutLinkContainer}>
      <div className={classes.userContainer} onClick={openUserSettingsModal}>
        {!isHandy && (
          <div className={classes.username}>{userData?.name || ""}</div>
        )}
        <IoSettingsOutline className={classes.settingsIcon} />
      </div>

      <div className={classes.logoutLink} onClick={handleLogout}>
        <div className={classes.linkContainer}>
          {!isHandy && <div>Logout</div>}
          <img src={iconSignout} alt="Logout" className={classes.icons} />
        </div>
      </div>
    </div>
  );
};

export default observer(Logout);
