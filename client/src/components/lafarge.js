import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function LaFarge({selectedPatientID}) {
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

    return (
        <div>
                <h1>VO2 by LaFarge Equation</h1>
                <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
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