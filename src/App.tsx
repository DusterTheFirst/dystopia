/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import React, { FunctionComponent } from "react";
import Gogle from "./sites/Gogle";
import ShoppingSite from "./sites/ShoppingSite";
import SocialCredit from "./sites/SocialCredit";
import { useHydratedState } from "./store";
import { GlobalStyle } from "./styles";
import useStalk from "./useStalk";

/** The paramaters that give each site its speech info */
export interface ISpeechParams {
    /** The current, most recent spoken sentence */
    sentence: string;
}

/** A map of the sites to their components */
const sites: { [x: string]: FunctionComponent | undefined } = {
    "gogle.com": Gogle,
    "shoppingsite.bruh": ShoppingSite,
    "socialcredit.gov": SocialCredit,
};

/** The main app component */
export default function App() {
    useHydratedState();
    const sudo = useStalk();

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
            <SiteContent />
            {sudo ? "SUDO ENABLED" : undefined}
            <h1>SITES</h1>
            <ul>
                {Object.keys(sites).map((x, key) => <li key={key}><a href={sites[x] === undefined ? undefined : `http://${x}/`}>{x}</a></li>)}
            </ul>
        </div>
    ));
}
