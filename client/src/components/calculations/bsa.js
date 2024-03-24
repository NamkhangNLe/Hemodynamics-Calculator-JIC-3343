import React, { useState, useEffect } from "react";
import { onSubmit } from "../../utils/calculationUtils";
import "../../styles/styles.css";

export default function Bsa({ patientObj }) {
    const [bsa, setBsa] = useState("");
    const valueType = "VO2 by BSA";
    const [calculatedValue, setCalculatedValue] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((bsa === "") ? "Enter calculation inputs" : "Missing input");

        setBsa((patientObj !== undefined) ? patientObj.bsa : bsa);

        if (bsa === "") {
            setCalculatedValue("");
            return;
        }

        const result = +(+bsa * 125).toFixed(3);
        setCalculatedValue(result);
    }, [bsa, patientObj]);

    return (
        <div>
            <h1>{valueType}</h1>
            <form onSubmit={e => onSubmit(e, patientObj, { valueType: valueType, calculatedValue: calculatedValue })}>
                <div>
                    Body Surface Area (m<sup>2</sup>): <input name="BSA" placeholder="Ex: 1.9 m2" type="number" value={bsa} onChange={e => setBsa(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> ml/min/m<sup>2</sup>
                </div>
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}