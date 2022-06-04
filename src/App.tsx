import "./App.scss";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {useEffect} from "react";
import {observer} from "mobx-react";
import "dotenv/config";

import Hauptmenue from "./pages/Hauptmenue";
import Filmsuche from "./pages/Filmsuche";
import DetailsMovie from "./pages/Details/DetailsMovie";
import DetailsPerson from "./pages/Details/DetailsPerson";
import Impressum from "./pages/Impressum";
import Hilfe from "./pages/Hilfe";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import WrongUrl from "./pages/WrongUrl";
import Showroom from "./pages/Showroom";
import ModalUserSettings from "./components/Modal-UserSettings";
import globalStore from "./stores/global-store";

function App() {
  const {
    openUserSettings,
    loadDarkModeFromLocalStorage,
  } = globalStore;

  useEffect(() => {
    loadDarkModeFromLocalStorage();
  }, []);

  return (
    <BrowserRouter basename="/happy-end-movies">
      <div>
        {openUserSettings && <ModalUserSettings/>}

        <Routes>
          <Route path="/" element={<Login/>}/>

          <Route path="" element={<Menu/>}>
            <Route
              path="filmsuche"
              element={<Filmsuche/>}
            />
            <Route
              path="showroom"
              element={<Showroom/>}
            />
            <Route
              path="detailansicht/movie/:id"
              element={<DetailsMovie/>}
            />
            <Route
              path="detailansicht/person/:id"
              element={<DetailsPerson/>}
            />
            <Route path="impressum" element={<Impressum/>}/>
            <Route path="hilfe" element={<Hilfe/>}/>
            <Route path="start" element={<Hauptmenue/>}/>
          </Route>
          <Route path="*" element={<WrongUrl/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default observer(App);
