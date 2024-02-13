import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function Weight({selectedPatientID}) {
    const [weight, setWeight] = useState();
    const [form, setForm] = useState({
        valueType: "Cardiac Index",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "Fick Cardiac Output", calculatedValue: Number(weight) * 3 });
    }

    return (
        <div>
                <h1>VO2 by Weight</h1>
                <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                    <div>
                        Weight: <input name="weight" type="number" value={weight} onChange={e => setWeight(e.target.value)}/>
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