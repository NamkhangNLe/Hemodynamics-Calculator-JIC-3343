import React, { useState, useEffect } from "react";
import "../../styles/styles.css";

export default function CardiacIndex({ updateCalculatedValue, co, bsa, setCo, setBsa }) {
    const valueType = "Cardiac Index";
    const valueCode = "CI";
    const [calculatedValue, setCalculatedValue] = useState("");

    const [placeholderText, setPlaceholderText] = useState("");

    useEffect(() => {
        setPlaceholderText((co === "" && bsa === "") ? "Enter calculation inputs" : "Missing inputs");

        if (co === "" || bsa === "") {
            setCalculatedValue("");
            updateCalculatedValue(valueCode, "");
            return;
        }

        const result = +(+co / +bsa).toFixed(3);
        setCalculatedValue(result);
        updateCalculatedValue(valueCode, result);
    }, [co, bsa]);

    return (
        <div>
            <form>
                <h2>{valueType}</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Cardiac Output (L/min):</span>
                    <input name="CO" placeholder="Ex: 5.2" type="number" value={co} onChange={e => setCo(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Body Surface Area (m<sup>2</sup>):</span>
                    <input name="BSA" placeholder="Ex: 1.9" type="number" value={bsa} onChange={e => setBsa(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Output:</span>
                    <input type="text" placeholder={placeholderText} value={calculatedValue} readOnly />
                </div>
            </form>
        </div>
    );
}