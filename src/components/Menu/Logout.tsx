import classes from "./Logout.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { IoSettingsOutline } from "react-icons/all";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../../firebase-config";
import iconSignout from "../../assets/icons/sign-out-alt_light.svg";
import globalStore from "../../stores/global-store";
import { ROUTES } from "../../models/routes";
import LoadingSpinner from "../LoadingSpinner";

interface ILogoutProps {
  isHandy: boolean;
}

const Logout = ({ isHandy }: ILogoutProps) => {
  const { userData, openUserSettingsModal, logout, setUserData } = globalStore;

  const [user, loading, error] = useAuthState(firebaseAuth);

  const navigate = useNavigate();

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(
  //       collection(firestoreDb, "users"),
  //       where("uid", "==", user?.uid)
  //     );
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Ein Fehler ist während des Datenübernahme des Users passiert");
  //   }
  // };

  const handleLogout = () => {
    logout().then(() => navigate(ROUTES.LOGIN));
  };

  useEffect(() => {
    if (!user) return navigate(ROUTES.LOGIN);
    setUserData(user);
  }, [user, navigate, setUserData]);

  if (loading) return <LoadingSpinner />;

  if (error) return <>Error {error.message}</>;

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
