// MobX
import { makeAutoObservable } from "mobx";

class GlobalStore {
   darkMode = false;
   colorTheme = "";

   constructor() {
      makeAutoObservable(this);
   }

   toggleDarkMode = () => {
      this.darkMode = !this.darkMode;
      if (this.darkMode) {
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
