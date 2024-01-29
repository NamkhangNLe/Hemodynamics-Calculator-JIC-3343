import React, { useState } from "react";

export default function Addition({selectedPatientID}) {
    console.log("from", selectedPatientID)
    const [val1, setVal1] = useState();
    const [val2, setVal2] = useState();
    const [form, setForm] = useState({
        valueType: "Addition",
        calculatedValue: ""
      });
    //const [calculatedValue, setCalculatedValue] = useState();

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Addition", calculatedValue: Number(val1) + Number(val2)});
        console.log("HERE");
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
        console.log("from front", newCalculation)
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
                <h1>Addition of Values</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        Value 1: <input name="value1" type="number" value={val1} onChange={e => setVal1(e.target.value)}></input>
                    </div>
                    <div>
                        Value 2: <input name="value2" type="number" value={val2} onChange={e => setVal2(e.target.value)}/>
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