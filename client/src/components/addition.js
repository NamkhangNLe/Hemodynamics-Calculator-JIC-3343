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
            messageAnimation("Calculation not saved.\nPatient was not selected.", "lightpink");
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
        }).then(messageAnimation("Calculation saved!"));

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

function messageAnimation(text, color) {
    // Create a div element with a fading animation
    const divElement = document.createElement('div');
    const textElement = document.createElement('span');
    textElement.innerText = text;
    divElement.className = "fading-div";
    divElement.style = color === undefined ? divElement.style : `background-color: ${color}`;
    divElement.append(textElement);
    divElement.style.opacity = 0; // Set initial opacity to 0
    divElement.style.transition = 'opacity 1s ease-in-out'; // Set animation transition
    document.body.appendChild(divElement); // Append the div to the body

    // Animate the div to fade in and fade out
    divElement.style.opacity = 1; // Fade in
    setTimeout(() => {
        divElement.style.opacity = 0; // Fade out
        setTimeout(() => {
            divElement.parentNode.removeChild(divElement); // Remove the div from the body
        }, 1000); // Delay removal after animation
    }, 2000); // Delay fade out after 2 seconds
}