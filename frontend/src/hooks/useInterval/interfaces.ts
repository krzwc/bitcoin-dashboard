interface IntervalHandlerAsObject {
    /**
     * IntervalId of the interval
     */
    intervalId: NodeJS.Timeout | null;
    /**
     * Function to start the interval
     */
    start(): void;
    /**
     * Function to stop the interval
     */
    stop(): void;
}

interface IntervalHandlerAsArray extends Array<null | NodeJS.Timeout | (() => void)> {
    2: NodeJS.Timeout | null;
    0(): void;
    1(): void;
}

// tslint:disable-next-line:no-empty-interface
interface IntervalHandler extends IntervalHandlerAsArray {}

export { IntervalHandlerAsObject, IntervalHandlerAsArray, IntervalHandler };
