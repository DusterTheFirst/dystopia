/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { autorun, observable, toJS } from "mobx";
import { createContext, useContext, useEffect } from "react";

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

/** Hook to hydrate the state from the server and keep sync between the 2 */
export function useHydratedState() {
    const state = useContext(GlobalState);

    /** State hydration */
    useEffect(() => {
        state.hydrateFromServer().then(() => {
            /** Sync the state with the state server */
            autorun(async () => {
                await fetch("http://localhost:6969", {
                    body: JSON.stringify(toJS(state)),
                    method: "POST"
                });
            });
        }).catch((e) => console.error(e));
    }, [state]);
}

/** The global state for the app */
export const GlobalState = createContext(new GlobalStateStore());