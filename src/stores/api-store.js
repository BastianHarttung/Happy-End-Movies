import { makeAutoObservable } from "mobx";

class ApiStore {

    selectedMovie;
    selectedPerson;

    constructor() {
        makeAutoObservable(this);
    }
}