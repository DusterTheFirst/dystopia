/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { ISpeechParams } from "../App";

/** The page gogle.com */
export default function Gogle({ sentence }: ISpeechParams) {
    return (
        <div>
            <h1>Welcome to gogle.com</h1>
            <pre>{sentence}</pre>
        </div>
    );
}