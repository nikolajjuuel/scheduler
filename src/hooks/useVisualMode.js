import { useState } from "react";
//changes states depending on what the last state was
const useVisualMode = function (initial) {
    const [history, setHistory] = useState([initial]);
    const transition = (newMode, replace) => {
        setHistory((prev) => {
            const newHistory = [...prev];
            if (replace) {
                newHistory.pop();
            }
            return [...newHistory, newMode];
        })
    }

    const back = () => {
        if (history.length < 2) {
            return;
        }
        setHistory((prev) => {
            const newHistory = [...prev];
            newHistory.pop();
            return newHistory;
        })
    }

    const mode = history[history.length - 1]
    return { mode, transition, back }
}


export default useVisualMode;