/*!
 * Copyright (C) 2020  Zachary Kohnen (DusterTheFirst)
 */

/** Function to speak the text given */
export default async function useSpeak(text: string) {
    return new Promise((resolve, reject) => {
        const synth = window.speechSynthesis;

        // const fn = () => {
            // const voices = synth.getVoices().slice(0);

            // Wait for voices to load in
            // if (voices.length === 0) {
            //     return;
            // } else {
            //     speechSynthesis.onvoiceschanged = null;
            // }

            // Create utterences
            const utter = new SpeechSynthesisUtterance(text);

            // Select soothing google voice
            // utter.voice = voices.find(v => v.name === "Google US English") ?? voices[0];

            synth.speak(utter);

            utter.onend = resolve;
            utter.onerror = reject;
        // };

        // fn();
        // speechSynthesis.onvoiceschanged = fn;
    });
}