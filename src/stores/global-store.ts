// MobX
import { makeAutoObservable, runInAction } from "mobx";
//Firebase
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { firebaseAuth, firestoreDb } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { IUser } from "../models/interfaces/interfaces";

class GlobalStore {
  userData: IUser | null = null;

  openPasswordResetModal: boolean = false;

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

  // Password Reset Modal
  openModalPasswordReset = (): void => {
    this.openPasswordResetModal = true;
  };
  closeModalPasswordReset = (): void => {
    this.openPasswordResetModal = false;
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

  //Authentication
  logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await this.setUserData(res.user);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = res.user;
      console.log(user);
      runInAction(() => {
        this.userData = {
          userId: user.uid,
          name,
          email,
        };
      });
      await setDoc(doc(firestoreDb, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        authProvider: "local",
      });
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      alert("Password reset link sent!");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  logout = async () => {
    try {
      await signOut(firebaseAuth);
      runInAction(() => {
        this.userData = {
          userId: "0",
          name: "",
          email: "",
        };
      });
    } catch (err: any) {
      console.log(err);
      alert(err.message);
    }
  };

  signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(firebaseAuth, googleProvider);
      const user = res.user;
      const q = query(
        collection(firestoreDb, "users"),
        where("uid", "==", user.uid)
      );
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(firestoreDb, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  // fetchUserName = async (userId: string) => {
  //   try {
  //     const q = query(
  //       collection(firestoreDb, "users"),
  //       where("uid", "==", userId)
  //     );
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     this.user = {};
  //   } catch (err) {
  //     console.error(err);
  //     alert("Ein Fehler ist während des Datenübernahme des Users passiert");
  //   }
  // };

  setUserData = async (user: User): Promise<void> => {
    getDoc(doc(firestoreDb, "users", user.uid))
      .then((docSnap) => {
        if (docSnap.exists()) {
          const name = docSnap.data().name;
          runInAction(() => {
            this.userData = {
              userId: user.uid,
              email: user.email || "",
              name: name,
            };
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching User", error);
      });
  };
}

const globalStore = new GlobalStore();
export default globalStore;
