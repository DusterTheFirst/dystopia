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
        "reset state": () => state.score = 100
    };

    const commands: ICommandMap = {
        "enter sudo": () => setSudo(true),
        "i am going to renounce my citizenship": () => state.score -= 50,
        "i disagree with the current government": () => state.score -= 10,
        "i don't like mr josephs class": () => state.score -= 10_000_000,
        "i don't like mr. joseph's class": () => state.score -= 10_000_000,
        "i hate the current government": () => state.score -= 20,
        "i hate the president elect": () => state.score -= 15,
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