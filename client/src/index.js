/**
 * Entry point of the React application.
 * Renders the App component inside a BrowserRouter component.
 * @module index
 */

import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from 'react-dom';

/**
 * Renders the App component inside a BrowserRouter component.
 * @function
 * @name render
 * @param {JSX.Element} component - The root component of the application.
 * @param {HTMLElement} container - The DOM element where the application will be rendered.
 * @returns {void}
 */


const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/* <Auth0Provider
                domain="dev-pucfassinisyfvbm.us.auth0.com"
                clientId="dRidvZAKqeoLrd6Kgr5Ps4stA9QZb48O"
                authorizationParams={{
                redirect_uri: window.location.origin
                }}
            > */}
                <App />
            {/* </Auth0Provider> */}
        </BrowserRouter>
    </React.StrictMode>,
);