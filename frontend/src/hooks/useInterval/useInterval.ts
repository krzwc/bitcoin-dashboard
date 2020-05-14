import { useEffect, useState, useRef } from 'react';
import { IntervalHandlerAsObject, IntervalHandlerAsArray, IntervalHandler } from './interfaces';
// Notice: https://github.com/imbhargav5/rooks/blob/master/packages/shared/useInterval.ts
// Notice: https://github.com/imbhargav5/rooks/tree/master/packages/interval

// tslint:disable-next-line:completed-docs
function useInterval(callback: () => any, intervalDuration: number, startImmediate: boolean = false): IntervalHandler {
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isRunning, setIsRunning] = useState(startImmediate);
    const savedCallback = useRef<() => any>();

    // tslint:disable-next-line:completed-docs
    function start() {
        if (!isRunning) {
            setIsRunning(true);
        }
    }

    // tslint:disable-next-line:completed-docs
    function stop() {
        if (isRunning) {
            setIsRunning(false);
        }
    }

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    });

    // Set up the interval.
    useEffect(() => {
        // tslint:disable-next-line:completed-docs
        function tick() {
            // tslint:disable-next-line:no-unused-expression
            savedCallback.current && savedCallback.current();
        }
        if (intervalDuration !== null && isRunning) {
            const id = setInterval(tick, intervalDuration);
            setIntervalId(id);

            return () => clearInterval(id);
        }
    }, [intervalDuration, isRunning]);

    // tslint:disable-next-line:prefer-const
    let handler: unknown;
    (handler as IntervalHandlerAsArray) = [start, stop, intervalId];
    (handler as IntervalHandlerAsObject).start = start;
    (handler as IntervalHandlerAsObject).stop = stop;
    (handler as IntervalHandlerAsObject).intervalId = intervalId;

    return handler as IntervalHandlerAsArray & IntervalHandlerAsObject;
}

export default useInterval;
