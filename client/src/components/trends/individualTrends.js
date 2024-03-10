import { Link , useParams } from 'react-router-dom';
import TrendTableEntry from "./trendTableEntry"
import React from "react";


const IndividualTrends = () => {
    const { id } = useParams();

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
                    <tr>
                        <TrendTableEntry id = {id} />
                    </tr>
                </tbody>
            </table>
        );
    }

    const viewLink = `/view/${id}`;

    return(
        <div>
            <div>
                <Link to={viewLink}> <button> View Patient Profile</button></Link>
                <Link to="/trends"> <button> View Other Patient Trends </button></Link>
            </div>

            {trendsTable()}

        </div>
    )
}

export default IndividualTrends