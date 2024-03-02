import React from "react";
import { Link , useParams } from 'react-router-dom';

const IndividualTrends = () => {
    const { id } = useParams();
    return(
        <div>
        <Link to="/trends"> <button> View Other Patient Trends </button></Link>
        <p>ID of Selected: {id}</p>
        </div>
    )
}

export default IndividualTrends


