/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { ChangeEvent, memo, MouseEvent, useContext, useState } from "react";
import Highlighter from "react-highlight-words";
import gogle from "../gogle.png";
import { GlobalState } from "../store";
import { FeedContent, FeedItem, FeedLink, FeedPath, FeedSeperator, FeedTimestamp, FeedTitle } from "../styles/feed";
import { GogleHeader, GogleLogo, GoglePage, GogleResults, GogleResultsText, GogleSearchBar } from "../styles/gogle";

dayjs.extend(relativeTime);

/** A map of search terms and their info */
interface ISearchIndex {
    [x: string]: {
        /** The link to the site */
        link: string;
        /** The site description */
        desc: string;
        /** The date of publication */
        date?: Dayjs;
        /** The peanalty inflicted on visiting */
        peanalty?: number;
    };
}

/** All of the possible search results */
const searches: ISearchIndex = {
    "Hot new kicks": {
        desc: "These great new shoes have all of the cool kids thinkin. They will make you hit the quan so hard.",
        link: "http://shoppingsite.bruh/shoes"
    },
    "My opinion on why the Ice Age™ baby deserves the death penalty": {
        desc: "[REDACTED FOR YOUR SAFETY]",
        link: "http://iceagelaw.co.uk.eu/death-penalty-list",
        peanalty: 5
    },
    "Opinion: Government control is bad": {
        desc: "[REDACTED FOR YOUR SAFETY]",
        link: "http://mycoolblog.802.1x/opinions/government-control",
        peanalty: 10
    },
    "Politcal Activism Central": {
        desc: "The national site for all things political activism. If you dont know what to do politically, check out our site! We have everything that a political activist could ever want, why not trust your government?",
        link: "http://bureauofthought.gov/politicalactivism"
    },
    "Social Credit Score": {
        desc: "View your national social credit score and tips on how to increase your score. Your one stop shop to success. The national social credit registry is the only place you can redeem your wrongdoings. Dont foget to obey ...",
        link: "http://socialcredit.gov/myscore"
    },
    "The Social Media": {
        desc: "The national one and only social media service used to connect people all over the United Capitalist States of Amerca. Post your images to share with the whole country. We strongly encourage that you post daily so that the world can keep track of you.",
        link: "http://bureauofthought.gov/socialmedia"
    },
    "What the government is trying to hide": {
        desc: "[REDACTED FOR YOUR SAFETY]",
        link: "http://reputiblejournalism.neut/government-cover-ups",
        peanalty: 20
    },
    "When to question your government": {
        desc: "[REDACTED FOR YOUR SAFETY]",
        link: "http://somecoolblogsitethattellsthetruth.co.no/when-to-question-your-government",
        peanalty: 20
    },
    "Why I left my government position": {
        desc: "[REDACTED FOR YOUR SAFETY]",
        link: "http://oldgovernmentdude.pregov/leave",
        peanalty: 15
    },
    "Why I will always agree with authority": {
        date: dayjs("10-4-1984"),
        desc: "The government and everyone in authority is always right and here is why. This factual piece will help you understand your place in society, under the boot of the authority",
        link: "http://bureauofthought.gov/news/1984/10/4/authority-is-always-right"
    },
    "Why dubs are obviously better than subs": {
        desc: "[REDACTED FOR YOUR SAFETY]",
        link: "http://animeisjustpchentai.provemewrong/subsvsdubs",
        peanalty: 50
    },
    "Why subs are obviously better than dubs": {
        desc: "The facts on the subs vs dubs debate. Subs are always better and dubs can eat my shorts.",
        link: "http://bureauofthought.gov/facts/subsvsdubs"
    }
};

/** The page gogle.com */
export default function Gogle() {
    const [search, setSearch] = useState<string[]>([]);

    const updateSearch = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.split(" "));
    const terms = search.filter(y => y.length > 0).map(x => x.toLowerCase());
    const results = terms.length === 0 ? Object.keys(searches) : Object.keys(searches).filter(x => terms.some(y => x.toLowerCase().includes(y)));

    return (
        <GoglePage>
            <GogleHeader>
                <GogleLogo src={gogle} alt="gogle"/>
                <GogleSearchBar placeholder="Search" value={search.join(" ")} onChange={updateSearch} />
            </GogleHeader>
            <GogleResults>
                <GogleResultsText>{results.length} results</GogleResultsText>
                {results.map((x, i) => <SearchResult key={i} link={searches[x].link} title={x} content={searches[x].desc} date={searches[x].date ?? dayjs("4-4-1984")} peanalty={searches[x].peanalty} terms={terms} />)}
            </GogleResults>
        </GoglePage>
    );
}

/** The props for a SearchResult */
interface IResultProps {
    /** The link */
    link: string;
    /** The title */
    title: string;
    /** The content/desc */
    content: string;
    /** The date */
    date: Dayjs;
    /** The peanalty inflicted on visiting */
    peanalty?: number;
    /** The search terms */
    terms: string[];
}

/** A search result item */
const SearchResult = memo(({ link, title, content, date, peanalty, terms }: IResultProps) => {
    const state = useContext(GlobalState);
    const peenalize = peanalty !== undefined ? (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        state.score -= peanalty;
        window.location.href = e.currentTarget.href;
    } : undefined;
    const missing = terms.filter(x => !title.toLowerCase().includes(x));

    return (
        <FeedItem>
            <FeedLink href={link} onClick={peenalize}>
                <FeedTitle><Highlighter textToHighlight={title} autoEscape={true} searchWords={terms} /></FeedTitle>
                <FeedPath>{link.replace(/https?:\/\//i, "").replace(/\//g, " > ")}</FeedPath>
            </FeedLink>
            <FeedSeperator />
            <FeedContent>{content}</FeedContent>
            <FeedTimestamp>{date.format("dddd, MMMM D, YYYY")} &#8226; {date.fromNow()}</FeedTimestamp>
            {missing.length > 0 ? <><FeedSeperator /><FeedTimestamp>Does not include: {missing.map((x, i) => <b key={i}>"{x}" </b>)}</FeedTimestamp></> : undefined}
        </FeedItem>
    );
});