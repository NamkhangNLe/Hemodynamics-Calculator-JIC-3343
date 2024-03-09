import { Link , useParams } from 'react-router-dom';
import TrendTableEntry from "./trendTableEntry"
import React, { useRef } from "react";
import { Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';


const IndividualTrends = () => {
    const { id } = useParams();
    const graphRef = useRef();

    /**
     * Renders the charts as a table, where each "table row" allows user to select
     * whatever calculation they want to render.
     */
    function trendsTable() {
        return (
            <table style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Individual Trends</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TrendTableEntry id = {id} />
                    </tr>
                    <tr>
                        <TrendTableEntry id = {id} />
                    </tr>
                    <tr>
                        <TrendTableEntry id = {id} />
                    </tr>
                </tbody>
            </table>
        );
    }

    const saveAsImage = () => {
        html2canvas(graphRef.current).then(canvas => {
            const link = document.createElement('a');
            link.download = 'trends.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    const viewLink = `/view/${id}`;

    return(
        <div>
            <div>
                <Link to={viewLink}> <button> View Patient Profile</button></Link>
                <Link to="/trends"> <button> View Other Patient Trends </button></Link>
                <Button onClick={saveAsImage}>Save Trends</Button>
            </div>

            <div ref={graphRef}>
                {trendsTable()}
            </div>


        </div>
    )
}

export default IndividualTrends