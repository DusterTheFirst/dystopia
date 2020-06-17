/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { autorun, observable, observe, toJS } from "mobx";
import { createContext, useContext, useEffect } from "react";
import speak from "./speak";

/** A history of the social credit score change */
export interface IScoreHistory {
    /** The change */
    change: number;
    /** The reason */
    reason: string;
}

/** The global state to use */
export class GlobalStateStore {
    /** The social credit score */
    @observable
    private _score = 200;

    /** The social credit score */
    public get score() {
        return this._score;
    }

    /** The history of social credit changes */
    @observable
    private _history: IScoreHistory[] = [];

    /** The history of social credit changes */
    public get history() {
        return this._history;
    }

    /** Change the score and push it to the history */
    public changeScore(change: number, reason: string): this {
        this._score += change;
        this._history.push({ change, reason });

        return this;
    }

    /** Set the score to a specific value */
    public setScore(set: number): this {
        this._score = set;

        return this;
    }

    /** Clear the change history */
    public clearHistory(): this {
        this._history = [];

        return this;
    }

    /** Hydrate the state from the server */
    public async hydrateFromServer() {
        const response = await fetch("http://localhost:6969");
        const store = await response.json() as GlobalStateStore;

        this._score = store._score;
        this._history = store._history;
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

            /** Announce changes in score */
            observe(state, "_score" as "score", async change => {
                if (change.oldValue !== undefined) {
                    const diff = change.oldValue - change.newValue;
                    if (diff > 0) {
                        await speak(`You have just lost ${diff} social credit points`);
                    } else {
                        await speak(`You have just gained ${Math.abs(diff)} social credit points`);
                    }
                }
            });
        }).catch((e) => console.error(e));
    }, [state]);
}

/** The global state for the app */
export const GlobalState = createContext(new GlobalStateStore());