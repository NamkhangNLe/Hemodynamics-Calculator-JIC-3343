import React, { useState } from "react";
import "../styles/styles.css"


export default function Svr({selectedPatientID}) {
    console.log("from", selectedPatientID)
    const [map, setMap] = useState();
    const [cvp, setCvp] = useState();
    const [co, setCo] = useState();
    const [form, setForm] = useState({
        valueType: "Systemic Vascular Resistance",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Systemic Vascular Resistance", calculatedValue: (Number(map) - Number(cvp)) / Number(co)});
    }

    /**
     * Handles the form submission by sending a POST request to the server to create a new calculation.
     * @param {Event} e - The form submission event.
     * @returns {void}
     */
    async function onSubmit(e) {
        e.preventDefault();

        // Create a new object with the values from the form state.
        const newCalculation = {selectedPatientID: selectedPatientID, ...form};
        try {
        // Send a POST request to the server to create a new record.
        const response = await fetch("http://localhost:5000/calculation/add", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newCalculation),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // If the fetch request is successful, log the response (optional).
        console.log('Record added successfully:', await response.json());

        // Reset the form state to empty values.
        setForm({valueType: "", calculatedValue: ""});

        } catch (error) {
        console.error('Error submitting form:', error);
        }
    }

    return (
        <div>
                <h1>Systemic Vasuclar Resistance</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        MAP: <input name="MPA" type="number" value={map} onChange={e => setMap(e.target.value)}/>
                    </div>
                    <div>
                        CVP: <input name="CVP" type="number" value={cvp} onChange={e => setCvp(e.target.value)}/>
                    </div>
                    <div>
                        CO: <input name="CO" type="number" value={co} onChange={e => setCo(e.target.value)}/>
                    </div>
                    <div>
                        Output: <input type="text" value={form.calculatedValue} readOnly/>
                    </div>
                    <div>
                        <button onClick={handleClick}>Calculate</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
        </div>
    );
   }