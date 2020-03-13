/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

import { useEffect } from "react";

/* tslint:disable no-unsafe-any no-any */

/** The speech recognition API */
const SpeechRecognition: typeof window.SpeechRecognition = window.SpeechRecognition ?? (window as any).webkitSpeechRecognition;
/** The speech grammar list API */
// const SpeechGrammarList: typeof window.SpeechGrammarList = window.SpeechGrammarList ?? (window as any).webkitSpeechGrammarList;
/** The speech recognition event API */
// const SpeechRecognitionEvent: typeof window.SpeechRecognitionEvent = window.SpeechRecognitionEvent ?? (window as any).webkitSpeechRecognitionEvent;

/* tslint:enable no-unsafe-any no-any */

/** A hook to use the SpeechRecognition api */
export default function useSpeech(callback: (sentence: string) => void) {
    useEffect(() => {
        // tslint:disable-next-line: strict-type-predicates
        if (SpeechRecognition === undefined) {
            console.error("Speech Recognition API is not supported in this browser, please use chrome");
            alert("Please switch to chrome");

            return undefined;
        }

        let cont = true;

        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.lang = "en-US";
        recog.maxAlternatives = 1;

        recog.start();

        recog.onresult = (event) => {
            console.log(event.results[0][0].transcript);
            if (event.results[0].isFinal) {
                callback(event.results[0][0].transcript);
            }
        };

        recog.onend = () => {
            if (cont) {
                recog.start();
            }
        };

        console.log(recog);

        return () => {
            cont = false;
            recog.stop();
        };
    }, [callback]);
}