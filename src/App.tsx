/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { autorun, toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import Gogle from "./sites/Gogle";
import ShoppingSite from "./sites/ShoppingSite";
import SocialCredit from "./sites/SocialCredit";
import { GlobalState } from "./store";
import { GlobalStyle } from "./styles";
import useSpeech from "./useSpeech";

/** The paramaters that give each site its speech info */
export interface ISpeechParams {
    /** The current, most recent spoken sentence */
    sentence: string;
}

/** A map of the sites to their components */
const sites: { [x: string]: FunctionComponent<ISpeechParams> | undefined } = {
    "gogle.com": Gogle,
    "shoppingsite.bruh": ShoppingSite,
    "socialcredit.gov": SocialCredit,
};

/** The main app component */
export default function App() {
    const [sentence, setSentence] = useState("");
    useSpeech(setSentence);
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

    const SiteContent = sites[window.location.host] ?? (() => (
        <div>
            This site has no content, please try one of the sites below
            <ul>
                {Object.keys(sites).map((x, key) => <li key={key}><a href={sites[x] === undefined ? undefined : `http://${x}/`}>{x}</a></li>)}
            </ul>
        </div>
    ));

    return useObserver(() => (
        <div>
            <GlobalStyle />
            <SiteContent sentence={sentence} />
            <pre>{JSON.stringify(toJS(state), undefined, 4)}</pre>
            <button onClick={() => state.score++}>+</button>
            <button onClick={() => state.score--}>-</button>
            <button onClick={() => state.score = 100}>RESET</button>
            <h1>SITES</h1>
            <ul>
                {Object.keys(sites).map((x, key) => <li key={key}><a href={sites[x] === undefined ? undefined : `http://${x}/`}>{x}</a></li>)}
            </ul>
        </div>
    ));
}
