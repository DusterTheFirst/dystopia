/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components";

/** A container for a feed item */
export const FeedItem = styled.div`
    color: black;
    text-align: left;
    margin: 20px auto;
    background-color: white;
    width: 80%;
    border-radius: 5px;
    border: solid #dddddd 1px;
    padding: 5px;
    box-shadow: 2px 2px 5px #cccccc;
    transition: box-shadow .5s ease-in-out;

    &:hover {
        box-shadow: 10px 10px 20px #cccccc;
    }
`;

/** The title element in a feed item */
export const FeedTitle = styled.div`
    font-size: 25px;
`;

/** A link */
export const FeedLink = styled.a`
    text-decoration: none;
    color: dodgerblue;
    text-align: left;
    word-wrap: break-word;

    &:visited {
        color: blueviolet;
    }
`;

/** The path to the link */
export const FeedPath = styled.div`
    font-style: italic;
    font-size: 15px;
    color: forestgreen;
`;

/** The hr between the metadata and link info */
export const FeedSeperator = styled.hr`
    margin: 3px 0;
    border: solid rgba(1,1,1,.2) 1px;
`;

/** The description */
export const FeedContent = styled.div`
    font-size: 1.4em;
    color: dimgray;
`;

/** The timestamp */
export const FeedTimestamp = styled.div`
    font-style: italic;
    font-size: .7em;
    color: slategray
`;