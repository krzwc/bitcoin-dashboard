import React, { useEffect, useState } from 'react';
import { List } from 'immutable';
import { isNull } from 'lodash-es';
import Chart from '../../components/chart';
import { usePoll } from '../../hooks';
import { TOTAL_X_TICKS } from '../../utils/consts';
import Container from '../../components/container';
import { withResizeDetector } from 'react-resize-detector';
import { POLLING_INTERVAL } from '../../utils/consts';
import { ENDPOINT } from '../../utils/endpoint';
import formatter from '../../utils/formatter';

const initialState = List([]);

interface BitcoinChartProps {
    width: number;
    height: number;
}

const BitcoinChart = ({ width, height }: BitcoinChartProps) => {
    const [chartData, setChartData] = useState(initialState);
    const [result, loading, error, start] = usePoll(ENDPOINT.CURRENT, POLLING_INTERVAL, formatter);
    useEffect(() => {
        if (!isNull(result) && !isNull(result[0]) && !isNull(result[1])) {
            setChartData((data) => {
                if (data.size >= TOTAL_X_TICKS) {
                    return data.shift().push({ time: result[0], USD: result[1] });
                }

                return data.push({ time: result[0], USD: result[1] });
            });
        }
    }, [result]);

    useEffect(() => {
        (start as () => void)();
    }, []);

    return (
        <Container>
            <h1>Current: {!loading && result && result[1]}</h1>
            {error && <p className="error">{error}</p>}
            <Chart data={chartData.toJS()} width={width} height={height} />
            {/*<button onClick={start as () => void}>Start</button>
            <button onClick={stop as () => void}>Stop</button>*/}
        </Container>
    );
};

export default withResizeDetector(BitcoinChart);
