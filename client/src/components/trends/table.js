import React, { useEffect, useRef, useState } from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Table = ({ URL, filter, chartId, height, width, name }) => {
    // Sets SDK for the chart
    const sdk = new ChartsEmbedSDK({ baseUrl: URL });

    // used for the actual chart being rendered in React
    const chartDiv = useRef(null);

    // hook for determining whether or not the chart is rendered or not
    const [rendered, setRendered] = useState(false);

    // create the actual chart by rendering it with the passed in params
    const [chart] = useState(sdk.createChart({ chartId: chartId, height: height, width: width, theme: "light" }));

    /**
     * Renders the chart.
     */
    useEffect(() => {
        chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
    }, [chart]);

    /**
     * Renders the chart with the applied filters.
     */
    useEffect(() => {
        if (rendered) {
            chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
        }
    }, [chart, filter, rendered]);

    return (
        <div>
            <div className="chart" ref={chartDiv} />
        </div>
    );
};

export default Table;