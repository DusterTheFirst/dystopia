/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { observable } from "mobx";
import { createContext } from "react";

/** The global state to use */
export class GlobalStateStore {
    /** The social credit score */
    @observable
    public score = 100;

    /** Hydrate the state from the server */
    public async hydrateFromServer() {
        const response = await fetch("http://localhost:6969");
        const store = await response.json() as GlobalStateStore;

        this.score = store.score;
    }
}

/** The global state for the app */
export const GlobalState = createContext(new GlobalStateStore());