// MobX
import {makeAutoObservable} from "mobx";
import {IUser} from "../models/interfaces/interfaces";


class GlobalStore {
  user: IUser = {userId: "23", name: "Bastian", email: "ich@email.de"};

  openUserSettings: boolean = false;

  darkMode: boolean = false;
  colorTheme: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  // User Settings Modal
  openUserSettingsModal = (): void => {
    this.openUserSettings = true;
  };

  closeUserSettingsModal = (): void => {
    this.openUserSettings = false;
  };

  // Dark Mode
  loadDarkModeFromLocalStorage = (): void => {
    const localdark = localStorage.getItem("darkmode");
    if (localdark) {
      this.setDarkModeToBody(localdark === "true");
    }
  };

  toggleDarkMode = (): void => {
    this.darkMode = !this.darkMode;
    localStorage.setItem("darkmode", this.darkMode.toString());
    this.setDarkModeToBody(this.darkMode);
  };

  setDarkModeToBody = (dark: boolean): void => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  // Color Theme
  setColorTheme = (color: string) => {
    this.colorTheme = color;
  };
}

const globalStore = new GlobalStore();
export default globalStore;
