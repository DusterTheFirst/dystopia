/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { ISpeechParams } from "../App";

/** The page socialcredit.gov */
export default function SocialCredit({ sentence }: ISpeechParams) {
    return (
        <div>
            <h1>Welcome to SocialCredit.gov</h1>

            <pre>{sentence}</pre>
        </div>
    );
}