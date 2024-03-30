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
     * Renders the chart
     */
    useEffect(() => {
        chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
    }, [chart]);

    /**
     * Renders the chart with the applied filters
     */
    useEffect(() => {
        if (rendered) {
            chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
        }
    }, [chart, filter, rendered]);

    /**
     * Handles the "export to CSV button click"
     */
    const exportToCSV = () => {
        chart.getData().then(data => {

            console.log(data.documents);
            const csv = convertToCSV(data.documents);
            console.log(csv);

            const blob = new Blob([csv], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${name}.csv`;
            link.click();
        });
    };

    /**
     * Parses an array (data.documents) to convert it as a CSV.
     */
    const convertToCSV = (data) => {
        const headers = ['Formula', 'Value', 'Date'];
        const csvRows = [];
        csvRows.push(headers.join(','));

        data.forEach(item => {

            const row = [
                item.group,
                item.group_series_0,
                item.group_series_1
            ];

            csvRows.push(row.join(','));
        });

        return csvRows.join('\n');
    };



    return (
        <div>
            <div className="chart" ref={chartDiv} />
            <button onClick={exportToCSV}>Download as CSV</button>
        </div>
    );
};

export default Table;