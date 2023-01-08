import classes from "./Logout.module.scss";
import { IoSettingsOutline } from "react-icons/all";
import { Link, useNavigate } from "react-router-dom";
import iconSignout from "../../assets/icons/sign-out-alt_light.svg";
import globalStore from "../../stores/global-store";
import { observer } from "mobx-react";
import { ROUTES } from "../../models/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firestoreDb } from "../../firebase-config";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

interface ILogoutProps {
  isHandy: boolean;
}

const Logout = ({ isHandy }: ILogoutProps) => {
  const { openUserSettingsModal,logout } = globalStore;

  const [user, loading, error] = useAuthState(firebaseAuth);

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(
        collection(firestoreDb, "users"),
        where("uid", "==", user?.uid)
      );
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("Ein Fehler ist während der Datenübernahme des Users passiert");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate(ROUTES.LOGIN);
    fetchUserName();
  }, [user, loading]);

  return (
    <div className={classes.logoutLinkContainer}>
      <div className={classes.userContainer} onClick={openUserSettingsModal}>
        {!isHandy && <div className={classes.username}>{name}</div>}
        <IoSettingsOutline className={classes.settingsIcon} />
      </div>

      <div className={classes.logoutLink}  onClick={logout}>
        <div className={classes.linkContainer}>
          {!isHandy && <div>Logout</div>}
          <img src={iconSignout} alt="Logout" className={classes.icons} />
        </div>
      </div>
    </div>
  );
};

export default observer(Logout);
