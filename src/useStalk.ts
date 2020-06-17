/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { useContext, useEffect, useState } from "react";
import { GlobalState } from "./store";
import useSpeech from "./useSpeech";

/** A map of commands */
interface ICommandMap {
    [x: string]: (() => void) | undefined;
}

/** Hook to track the user */
export default function useStalk() {
    const state = useContext(GlobalState);
    const [sudo, setSudo] = useState(false);

    const sudoCommads: ICommandMap = {
        "exit sudo": () => setSudo(false),
        "reset state": () => state.setScore(200).clearHistory()
    };

    const commands: ICommandMap = {
        "enter sudo": () => setSudo(true),

        // Lose
        "i am going to renounce my citizenship": () => state.changeScore(-50, "Stated want to renounce citizenship"),
        "i disagree with the current government": () => state.changeScore(-10, "Disagreement with the government"),
        "i don't get why is all truth is supressed": () => state.changeScore(-20, "Questioning the government"),
        "i don't like mr josephs class": () => state.changeScore(-10_000_000, "LIES"),
        "i don't like mr. joseph's class": () => state.changeScore(-10_000_000, "LIES"),
        "i hate the current government": () => state.changeScore(-20, "Hate towards the government"),
        "i think this whole social credit thing is stupid": () => state.changeScore(-15, "Disagreement with the government"),
        "someone needs to do something about this broken government": () => state.changeScore(-20, "Questioning the government"),
        "this is stupid": () => state.changeScore(-15, "General negativity"),

        // Gain
    };

    useEffect(() => {
        console.group("Avaliable Commands:");
        Object.keys(commands).forEach((cmd) => console.log(`%c${cmd}`, "color: chartreuse"));
        console.groupEnd();

        console.group("Avaliable SUDO Commands:");
        Object.keys(sudoCommads).forEach((cmd) => console.log(`%c${cmd}`, "color: gold"));
        console.groupEnd();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useSpeech((sentence) => {
        if (sudo) {
            const command = sudoCommads[sentence.toLowerCase()];
            if (command === undefined) {
                console.log(`%cSUDO: %c${sentence}`, "color: red", "color: grey");
            } else {
                console.log(`%cSUDO: %c${sentence} %c| %c${command}`, "color: red", "color: gold", "color: red", "color: pink");
                command();
            }
        } else {
            const command = commands[sentence.toLowerCase()];
            if (command === undefined) {
                console.log(`%c${sentence}`, "color: grey");
            } else {
                console.log(`%c${sentence} %c| %c${command}`, "color: chartreuse", "color: red", "color: pink");
                command();
            }
        }
    });

    return sudo;
}