import React from "react";
// We use Route in order to define the different routes of our application
import {Routes, Route} from "react-router-dom";
 // We import all the components we need in our app

import Patients from "./pages/patients";
import Calculator from "./pages/calculator";
import Create from "./components/create";
import Edit from "./components/edit";

import './styles/styles.css';

/**
 * Renders the main application component.
 * @returns {JSX.Element} The App component
 */
/**
 * The main component of the application.
 * @returns {JSX.Element} The JSX element representing the App component.
 */
 const App = () => {
 return (
  <Routes>
    <Route exact path="/" element={<Patients />} />
    <Route path="/calculator" element={<Calculator />} />
    <Route path="/create" element={<Create />} />
    <Route path="/edit/:id" element={<Edit />} />
  </Routes>
);
};
 export default App;