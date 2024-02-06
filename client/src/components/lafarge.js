import React, { useState, useEffect } from "react";
import "../styles/styles.css"



export default function LaFarge({selectedPatientID}) {
    console.log("from", selectedPatientID)
    const [logeage, setLogeage] = useState();
    const [hr, setHr] = useState();
    const [form, setForm] = useState({
        valueType: "VO2 by LaFarge Equation",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

  
        // LaFarge for Male
        setForm({valueType: "VO2 by LaFarge Equation", calculatedValue: 138.1 - (11.49 * Number(logeage)) + (0.378 * Number(hr))});
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
                <h1>VO2 by LaFarge Equation</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        Logeage: <input name="logeage" type="number" value={logeage} onChange={e => setLogeage(e.target.value)}/>
                    </div>
                    <div>
                        Heart Rate: <input name="hr" type="number" value={hr} onChange={e => setHr(e.target.value)}/>
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