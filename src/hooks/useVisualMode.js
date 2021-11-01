import { useState } from "react";

const useVisualMode = function (initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    console.log('mode', mode)


    const transition = (event, BOOLEAN) => {
        setMode(() => event);
        setHistory((history) => [...history, event])

        if (BOOLEAN) {
            history.pop()
        }

    }

    const back = ((event) => {
        if (history.length > 1) {
            history.pop()
            setHistory(() => history);
            setMode(() => history[history.length - 1]);

        }
    })




    return { mode, transition, back }

}


export default useVisualMode;