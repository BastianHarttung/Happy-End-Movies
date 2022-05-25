import "./App.scss";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

import Hauptmenue from "./pages/Hauptmenue";
import Filmsuche from "./pages/Filmsuche";
import DetailsMovie from "./pages/Details/DetailsMovie";
import DetailsPerson from "./pages/Details/DetailsPerson";
import DetailsTv from "./pages/Details/DetailsTv";
import Impressum from "./pages/Impressum";
import Hilfe from "./pages/Hilfe";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import ModalUserSettings from "./components/Modal-UserSettings";
import "dotenv/config";
import globalStore from "./stores/global-store";
import WrongUrl from "./pages/WrongUrl";
import {observer} from "mobx-react";

function App() {
  const {
    openUserSettings,
    loadDarkModeFromLocalStorage,
  } = globalStore;

  const [selectedMovie, setSelectedMovie] = useState({});
  const [selectedPerson, setSelectedPerson] = useState({});

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
            {/*<Route*/}
            {/*  path="showroom"*/}
            {/*  element={*/}
            {/*    <Showroom*/}
            {/*      saveSelectedMovie={(movie: any, category: TCategory) =>*/}
            {/*        saveSelectedMovieOrPerson(movie, category)*/}
            {/*      }*/}
            {/*    />*/}
            {/*  }*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path="detailansicht/movie/:id"*/}
            {/*  element={*/}
            {/*    <DetailsMovie*/}
            {/*      saveSelectedPerson={(person: any) =>*/}
            {/*        saveSelectedMovieOrPerson(person, "person")*/}
            {/*      }*/}
            {/*      movie={selectedMovie}*/}
            {/*    />*/}
            {/*  }*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path="detailansicht/tv/:id"*/}
            {/*  element={*/}
            {/*    <DetailsTv*/}
            {/*      saveMovieToDb={(movieForDb: any) =>*/}
            {/*        saveMovieToDb(movieForDb)*/}
            {/*      }*/}
            {/*      saveSelectedPerson={(person: any) =>*/}
            {/*        saveSelectedMovieOrPerson(person, "person")*/}
            {/*      }*/}
            {/*      movie={selectedMovie}*/}
            {/*    />*/}
            {/*  }*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path="detailansicht/person/:id"*/}
            {/*  element={*/}
            {/*    <DetailsPerson*/}
            {/*      saveSelectedMovie={(movie: any, category: TCategory) =>*/}
            {/*        saveSelectedMovieOrPerson(movie, category)*/}
            {/*      }*/}
            {/*      person={selectedPerson}*/}
            {/*    />*/}
            {/*  }*/}
            {/*/>*/}
            <Route
              path="impressum"
              element={<Impressum/>}
            />
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
