/**
 * Entry point of the React application.
 * Renders the App component inside a BrowserRouter component.
 * @module index
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

/**
 * Renders the App component inside a BrowserRouter component.
 * @function
 * @name render
 * @param {JSX.Element} component - The root component of the application.
 * @param {HTMLElement} container - The DOM element where the application will be rendered.
 * @returns {void}
 */
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);