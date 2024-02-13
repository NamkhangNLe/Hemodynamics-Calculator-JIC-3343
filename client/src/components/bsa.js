import React, { useState, useEffect } from "react";
import { onSubmit } from "../utils/calculationUtils";
import "../styles/styles.css"

export default function Bsa({selectedPatientID}) {
    const [bsa, setBsa] = useState();
    const [form, setForm] = useState({
        valueType: "VO2 by BSA",
        calculatedValue: ""
      });

    function handleClick(e) {
        // This prevents the form from being submitted when the calculate button is pressed.
        e.preventDefault();

        // Define formula logic
        setForm({valueType: "VO2 by BSA", calculatedValue: Number(bsa) * 125 });
    }

    return (
        <div>
                <h1>VO2 by BSA</h1>
                <form onSubmit={e => onSubmit(e, selectedPatientID, form)}>
                    <div>
                        BSA: <input name="BSA" type="number" value={bsa} onChange={e => setBsa(e.target.value)}/>
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