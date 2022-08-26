import "./sidebar.module.scss"
import {observer} from "mobx-react";
import classes from "../Showroom.module.scss";
import {ReactComponent as CloseIcon} from "*.svg";
import SearchBar from "../../../components/SearchBar";
import {TCategoryFilter, THappyEndFilter} from "../../../models/types";
import {EHappyEndFilter} from "../../../models/enums";
import FskIndicator from "../../../components/FskIndicator";
import showroomStore from "../../../stores/page-stores/showroom-store";


interface ISidebarProps {
  sidebarOpen: boolean;
  onCloseSidebar: () => void;
}

const Sidebar = ({sidebarOpen, onCloseSidebar}: ISidebarProps) => {

  const {
    filterFormStore,
    filteredDbLength,
    searchMovieDb,
  } = showroomStore;

  const {
    filterActive,
    fskPosAge,
    filterHappyEnd,
    filterCategory,
    startFiltering,
    setSearchFor,
    setFilterCategory,
    setFilterHappyEnd,
    setFskPosAge,
  } = filterFormStore;

  const styleSidebar = {
    minWidth: sidebarOpen ? "210px" : "0px",
    width: sidebarOpen ? "20%" : "0",
    borderRight: sidebarOpen ? "1px solid var(--gray)" : "0px",
  };

  return (
    <div className={classes.sidebar}
         style={styleSidebar}>

      <div className={classes.sidebarCloseBtnContainer}>
        {/*<CloseIcon className={classes.sidebarCloseBtn}*/}
        {/*           onClick={onCloseSidebar}/>*/}
      </div>

      <div>
        <div className={classes.searchContainer}>
          <SearchBar
            length={13}
            searchSize={15}
            searchMovie={(movieName, searchCategory) => searchMovieDb(movieName, searchCategory)}
            saveSearchFor={setSearchFor}
          />
        </div>

        <div className={classes.filterContainer}>

          <button onClick={startFiltering}
                  className={!filterActive ? classes.btnActive : ""}>{filterActive ? "Filter deaktivieren" : "Filter sind deaktiviert"}
          </button>

          <div className={classes.filterSegmentContainer}>

            <div className={classes.filterSegment}>
              <select name="category"
                      id="category"
                      value={filterCategory}
                      onChange={(e) => {
                        setFilterCategory(e.target.value as TCategoryFilter)
                      }}>
                <option value="allCategories">Filme + Serien</option>
                <option value="movie">Filme</option>
                <option value="tv">Serien</option>
              </select>
            </div>

            <div className={classes.filterSegment}>
              <select name="happyEnd"
                      id="happyEnd"
                      value={filterHappyEnd}
                      onChange={(e) => {
                        setFilterHappyEnd(e.target.value as THappyEndFilter)
                      }}>
                <option value={EHappyEndFilter.ALL_ENDS}>Alle Enden</option>
                <option value={EHappyEndFilter.TRUE}>Happy End</option>
                <option value={EHappyEndFilter.FALSE}>kein Happy End</option>
              </select>
            </div>

            <div className={classes.fskIndicatorContainer}>
              <FskIndicator arrowPos={fskPosAge}
                            saveFskPos={setFskPosAge}/>
            </div>

          </div>

          <button onClick={() => {
            // filterDatabase(moviesDb, filterCategory, filterHappyEnd, fskPosAge);
          }}
                  className={filterActive ? classes.btnActive : ""}>{filterActive ? "Gefiltert" : "Filtern"}
          </button>

          <div className={classes.sidebarInfos}>
            <div><b>{filteredDbLength}</b> Filme</div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default observer(Sidebar)