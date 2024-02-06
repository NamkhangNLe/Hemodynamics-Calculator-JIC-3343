import React, { useState } from "react";
import "../styles/styles.css"


export default function Fick({selectedPatientID}) {
    console.log("from", selectedPatientID)
    const [vo2, setVo2] = useState();
    const [hb, setHb] = useState();
    const [satA, setSatA] = useState();
    const [satMV, setSatMV] = useState();
    const [form, setForm] = useState({
        valueType: "Fick Cardiac Output",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Fick Cardiac Output", calculatedValue: Number(vo2) / (Number(hb) * 13.6 * (Number(satA) - Number(satMV)))});
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
                <h1>Fick Cardiac Output</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        VO2: <input name="VO2" type="number" value={vo2} onChange={e => setVo2(e.target.value)}/>
                    </div>
                    <div>
                        Hb: <input name="Hb" type="number" value={hb} onChange={e => setHb(e.target.value)}/>
                    </div>
                    <div>
                        Sat A: <input name="Sat A" type="number" value={satA} onChange={e => setSatA(e.target.value)}/>
                    </div>
                    <div>
                        Sat MV: <input name="Sat MV" type="number" value={satMV} onChange={e => setSatMV(e.target.value)}/>
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