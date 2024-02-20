import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
// Here, we display our Navbar
/**
 * Renders the Navbar component.
 * @returns {JSX.Element} The Navbar component.
 */
/**
 * Renders the Navbar component.
 * @returns {JSX.Element} The Navbar component.
 */
/**
 * Renders the Navbar component.
 * @returns {JSX.Element} The rendered Navbar component.
 */
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    <img style={{ "width": 25 + '%', "height": 25 + "%" }} src="emory.png"></img>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    );
}