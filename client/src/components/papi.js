import React, { useState } from "react";
import "../styles/styles.css"


export default function Papi({selectedPatientID}) {
    console.log("from", selectedPatientID)
    const [pasp, setPasp] = useState();
    const [padp, setPadp] = useState();
    const [ra, setRa] = useState();
    const [form, setForm] = useState({
        valueType: "Pulmonary Artery Pulsatility Index",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Pulmonary Artery Pulsatility Index", calculatedValue: (Number(pasp) - Number(padp)) / Number(ra)});
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
                <h1>Pulmonary Artery Pulsatility Index</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        PASP: <input name="PASP" type="number" value={pasp} onChange={e => setPasp(e.target.value)}/>
                    </div>
                    <div>
                        PADP: <input name="PADP" type="number" value={padp} onChange={e => setPadp(e.target.value)}/>
                    </div>
                    <div>
                        RA: <input name="RA" type="number" value={ra} onChange={e => setRa(e.target.value)}/>
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