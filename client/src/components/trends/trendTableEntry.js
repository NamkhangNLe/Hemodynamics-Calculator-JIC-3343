import Chart from "./chart"
import React, { useState } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';

const TrendTableEntry = ({ id, calculation }) => {
    // Filer used for charts that filters them by patient ID and the valueType (aka Formula)
    const filter = { "patient_id": id, "valueType": calculation }

    return (
        <div>
            <div>
                <h4>{calculation}</h4>
            </div>
            <div></div>
            <div style={{ display: 'inline-block' }}>
                <Chart URL={'https://charts.mongodb.com/charts-project-0-wijrh'} height={'300px'} width={'450px'} filter={filter} chartId={'65ea016e-419a-4c24-83ff-f91a9ecd93a4'} />
            </div>
            <div style={{ display: 'inline-block' }}>
                <Chart URL={'https://charts.mongodb.com/charts-project-0-wijrh'} height={'300px'} width={'600px'} filter={filter} chartId={'65ea6f54-6ce2-482f-845f-35dc4a0ee6d6'} />
            </div>
            <div style={{ display: 'inline-block' }}>
                <Chart URL={'https://charts.mongodb.com/charts-project-0-wijrh'} height={'150px'} width={'150px'} filter={filter} chartId={'65ea73f6-dfed-4789-8295-b690d54601d6'} />
                <Chart URL={'https://charts.mongodb.com/charts-project-0-wijrh'} height={'150px'} width={'150px'} filter={filter} chartId={'65ea74a3-4d09-4950-8e7c-1b35db3504d0'} />
            </div>
        </div>
    )
}

export default TrendTableEntry