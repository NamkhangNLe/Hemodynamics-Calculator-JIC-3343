import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function Bsa({ updateCalculatedValue, bsa, setBsa }) {
    const valueType = "VO2 by BSA";
    const valueCode = "BSA";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((bsa === "") ? "Enter calculation inputs" : "Missing input");

        if (bsa === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+bsa * 125).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [bsa]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div>
                    Body Surface Area (m<sup>2</sup>): <input name="BSA" placeholder="Ex: 1.9" type="number" value={bsa} onChange={e => setBsa(e.target.value)} />
                </div>
                <div>
                    Output: <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly /> ml/min/m<sup>2</sup>
                </div>
            </form>
        </div>
    );
}