import "./App.scss";
import { useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { observer } from "mobx-react";
import "dotenv/config";
import { ROUTES } from "./models/routes";
import globalStore from "./stores/global-store";

import Hauptmenue from "./pages/Hauptmenue";
import Filmsuche from "./pages/Filmsuche";
import DetailsMovie from "./pages/Details/DetailsMovie";
import DetailsPerson from "./pages/Details/DetailsPerson";
import Impressum from "./pages/Impressum";
import Hilfe from "./pages/Hilfe";
import Login from "./pages/Login/Login";
import Menu from "./pages/Menu";
import WrongUrl from "./pages/WrongUrl";
import Showroom from "./pages/Showroom/Showroom";
import DetailsTv from "./pages/Details/DetailsTv";
import ModalUserSettings from "./components/Modal-UserSettings";
import ModalPasswordReset from "./components/ModalPasswordReset";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase-config";

function App() {
  const {
    openUserSettings,
    openPasswordResetModal,
    loadDarkModeFromLocalStorage,
  } = globalStore;

  const [user, loading, error] = useAuthState(firebaseAuth);

  useEffect(() => {
    loadDarkModeFromLocalStorage();
  }, [loadDarkModeFromLocalStorage]);

  useEffect(() => {
    if (loading || error) return;
  }, [user, loading]);

  return (
    <BrowserRouter basename="/happy-end-movies">
      <div>
        {openUserSettings && <ModalUserSettings />}
        {openPasswordResetModal && <ModalPasswordReset />}

        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />

          {user && (
            <Route path="" element={<Menu />}>
              <Route path={ROUTES.START} element={<Hauptmenue />} />
              <Route path={ROUTES.FILMSUCHE} element={<Filmsuche />} />
              <Route path={ROUTES.SHOWROOM} element={<Showroom />} />
              <Route path="/detailansicht">
                <Route path={ROUTES.DETAILS_MOVIE} element={<DetailsMovie />} />
                <Route path={ROUTES.DETAILS_TV} element={<DetailsTv />} />
                <Route
                  path={ROUTES.DETAILS_PERSON}
                  element={<DetailsPerson />}
                />
              </Route>
              <Route path={ROUTES.IMPRESSUM} element={<Impressum />} />
              <Route path={ROUTES.HILFE} element={<Hilfe />} />
            </Route>
          )}
          <Route path="*" element={<WrongUrl />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default observer(App);
