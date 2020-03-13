/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { ISpeechParams } from "../App";

/** The page shoppingsite.bruh */
export default function ShoppingSite({ sentence }: ISpeechParams) {
    return (
        <div>
            <h1>Welcome to shppingsite.bruh</h1>

            <pre>{sentence}</pre>
        </div>
    );
}