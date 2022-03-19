// MobX
import { makeAutoObservable } from "mobx";

class GlobalStore {
   user = { userId: 23, name: "Bastian" };

   darkMode = false;
   colorTheme = "";

   constructor() {
      makeAutoObservable(this);
   }

   loadDarkModeFromLocalStorage = () => {
      const localdark = localStorage.getItem("darkmode") === "true";
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
      if (dark) {
         document.body.classList.add("dark");
      } else {
         document.body.classList.remove("dark");
      }
   };

   setColorTheme = (color) => {
      this.colorTheme = color;
   };
}

const globalStore = new GlobalStore();
export default globalStore;
