import React, { useState, useEffect } from "react";
import "../styles/styles.css"


export default function Addition({selectedPatientID}) {
    console.log("from", selectedPatientID)
    const [val1, setVal1] = useState("");
    const [val2, setVal2] = useState("");
    // const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("Enter calculation inputs");
    const [form, setForm] = useState({
        valueType: "Addition",
        calculatedValue: ""
      });

    useEffect(() => {
        setPlaceholderText((val1 === "" && val2 === "") ? "Enter calculation inputs" : "Missing inputs");
        let output = (val1 !== "" && val2 !== "") ? +val1 + +val2 : "";
        // setCalculatedValue(output);
        setForm({valueType: "Addition", calculatedValue: output});
    }, [val1, val2]);

    /**
     * Handles the form submission by sending a POST request to the server to create a new calculation.
     * @param {Event} e - The form submission event.
     * @returns {void}
     */
    async function onSubmit(e) {
        e.preventDefault();

        if (selectedPatientID === undefined) {
            return;
        }
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
                    Value 1: <input name="value1" type="number" step="1.0" value={val1} onChange={e => setVal1(e.target.value)}/>
                </div>
                <div>
                    Value 2: <input name="value2" type="number" value={val2} onChange={e => setVal2(e.target.value)}/>
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={form.calculatedValue} readOnly/>
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}