/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components";

/** Props for components that change depending if the page is on the landing page */
interface ILandingPageable {
    /** If the page should be a landing page */
    landing: boolean;
}

/** The wrapper for the gogle page */
export const GoglePage = styled.div`
    height: 100%;
`;

/** The gogle header area */
export const GogleHeader = styled.div<ILandingPageable>`
    text-align: ${props => props.landing ? "center" : "default"};
    position: ${props => props.landing ? "relative" : "sticky"};
    top: ${props => props.landing ? "50%" : "0"};
    left: ${props => props.landing ? "50%" : undefined};
    transform:  ${props => props.landing ? "translate(-50%, -50%)" : undefined};
    background: white;
    border-bottom: ${props => props.landing ? undefined : "solid #cecece 1px"};
`;

/** The results */
export const GogleResults = styled.div<ILandingPageable>`
    display: ${props => props.landing ? "none" : "block"};
    max-width: 1000px;
`;

/** The gogle search bar */
export const GogleSearchBar = styled.input<ILandingPageable>`
    padding: 10px 15px;
    font-size: 18px;
    border-radius: 50px;
    border: solid #cecece 1px;
    width: calc(100% - (180px + 70px));
    max-width: calc(1000px - (180px + 70px));
`;

/** The gogle logo */
export const GogleLogo = styled.img<ILandingPageable>`
    width: ${props => props.landing ? "300px" : "100px"};
    display: ${props => props.landing ? "block" : "inline"};
    margin: ${props => props.landing ? "auto" : undefined};
    padding: 15px 20px;
    vertical-align: middle;
`;

/** The results bar */
export const GogleResultsText = styled.div`
    color: #707070;
    margin: 5px auto 0px auto;
    width: 80%;
`;