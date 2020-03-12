/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import React, { useState } from "react";
import { GlobalStyle } from "./styles";
import useSpeech from "./useSpeech";

/** The main app component */
export default function App() {
    const [sentence, setSentence] = useState("");
    useSpeech(setSentence);

    return (
        <div>
            <GlobalStyle />
            <pre>{sentence}</pre>
            <a href="http://socialcredit.gov/">socialcredit.gov</a>
            <br/>
            <a href="http://gogle.com/">gogle.com</a>
            <br/>
            <a href="http://shoppingsite.bruh/">shoppingsite.bruh</a>
        </div>
    );
}
