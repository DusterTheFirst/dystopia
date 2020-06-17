/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { createGlobalStyle } from "styled-components";

/** The global styles for the app */
export const GlobalStyle = createGlobalStyle`
    html, body, #root {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
            monospace;
    }

    mark {
        background: none;
        font-weight: bold;
        color: inherit;
    }

    a:visited mark {
        color: blueviolet;
    }
`;