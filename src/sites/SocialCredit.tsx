/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { useObserver } from "mobx-react-lite";
import React, { useContext } from "react";
import { GlobalState } from "../store";

/** The page socialcredit.gov */
export default function SocialCredit() {
    const state = useContext(GlobalState);

    return useObserver(() => (
        <div>
            <h2>The official website of the</h2>
            <h1>National Social Credit Registry</h1>
            <h2>Your social credit score is {state.score}</h2>
            <pre>{JSON.stringify(state.history, undefined, 4)}</pre>
        </div>
    ));
}