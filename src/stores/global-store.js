// MobX
import { makeAutoObservable } from "mobx";

class GlobalStore {
   user = { userId: 23, name: "Bastian" };

   openUserSettings = false;

   darkMode = false;
   colorTheme = "";

   constructor() {
      makeAutoObservable(this);
   }

   // User Settings Modal
   openUserSettingsModal = () => {
      this.openUserSettings = true;
   };

   closeUserSettingsModal = () => {
      this.openUserSettings = false;
   };

   // Dark Mode
   loadDarkModeFromLocalStorage = () => {
      const localdark = localStorage.getItem("darkmode");
      if (localdark) {
         this.setDarkModeToBody(localdark);
      }
   };

   toggleDarkMode = () => {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkmode", this.darkMode.toString());
      this.setDarkModeToBody(this.darkMode);
   };

   setDarkModeToBody = (dark) => {
      if (dark === "true") {
         document.body.classList.add("dark");
      } else {
         document.body.classList.remove("dark");
      }
   };

   // Color Theme
   setColorTheme = (color) => {
      this.colorTheme = color;
   };
}

const globalStore = new GlobalStore();
export default globalStore;
