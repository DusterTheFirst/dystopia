/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components";

/** The wrapper for the gogle page */
export const GoglePage = styled.div``;

/** The gogle header area */
export const GogleHeader = styled.div`
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background: white;
    border-bottom: solid #cecece 1px;
`;

/** The results */
export const GogleResults = styled.div`
    max-width: 1000px;
`;

/** The gogle search bar */
export const GogleSearchBar = styled.input`
    padding: 15px 20px;
    font-size: 18px;
    border-radius: 50px;
    border: solid #cecece 1px;
    width: calc(100% - (180px + 70px));
    max-width: calc(1000px - (180px + 70px));
`;

/** The gogle logo */
export const GogleLogo = styled.img`
    width: 100px;
    padding: 30px 40px;
    vertical-align: middle;
`;

/** The results bar */
export const GogleResultsText = styled.div`
    color: #707070;
    margin: 5px auto 0px auto;
    width: 80%;
`;