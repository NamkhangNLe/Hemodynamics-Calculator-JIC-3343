import Chart from "./chart"
import React, { useState } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';

const TrendTableEntry = ({id}) => {

    // Set the selected calculation, for filtering
    const [selectedCalculation, setSelectedCalculation] = useState("");

    // Filer used for charts that filters them by patient ID and the valueType (aka Formula)
    const filter = {"patient_id" : id , "valueType" : selectedCalculation.name}

    // Possible calculations, for the dropdown menu
    const calculations = [
        { name: "Addition"},
        { name: "Systemic Vasuclar Resistance"},
        { name: "Pulmonary Vascular Resistance"},
        { name: "Transpulmonary Gradient"},
        { name: "Diastolic Pulmonary Gradient"},
        { name: "Pulmonary Artery Pulsatility Index"},
        { name: "Cardiac Index"},
        { name: "Fick Cardiac Output"},
        { name: "VO2 by Weight"},
        { name: "VO2 by BSA"},
        { name: "VO2 by LaFarge Equation"}
    ];

    /**
     * Sets the selected calculation from the dropdown menu
     */
    const CalculationDropdownOption = (props) => (
        <Dropdown.Item onClick={() => {
            setSelectedCalculation({
                name: props.calculation.name,
            })
            console.log(selectedCalculation.name);
        }}>{props.calculation.name}</Dropdown.Item>
    )

    /**
     * Populates the drop down menu with the formulas
     */
    function calculationList() {
        return calculations.map((calculation) => {
            return <CalculationDropdownOption calculation={calculation} />
        }
        );
    }

    return (
        <div>
            <form>
                <label>
                    Calculation:
                    <DropdownButton id="dropdown-basic-button" title={selectedCalculation.name}>{calculationList()}</DropdownButton>
                </label>
            </form>

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