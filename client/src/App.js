import React from "react";
// We use Route in order to define the different routes of our application
import { Routes, Route } from "react-router-dom";
// We import all the components we need in our app

import CalculatorFramework from "./pages/calculator";
import Edit from "./components/edit";
import Create from "./components/create";
import PageFramework from "./pages/framework";
import RecordList from "./components/recordList";
import View from "./components/view";
import Trends from "./pages/trends"
import IndividualTrends from "./components/trends/individualTrends"

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
            <Route exact path="/" element={<PageFramework component={<RecordList />} />} />
            <Route path="/calculator" element={<PageFramework component={<CalculatorFramework />} />} />
            <Route path="/create" element={<PageFramework component={<Create />} />} />
            <Route path="/edit/:id" element={<PageFramework component={<Edit />} />} />
            <Route path="/view/:id" element={<PageFramework component={<View />} />} />
            <Route path="/trends" element={<PageFramework component={<Trends />} />} />
            <Route path="/trends/:id" element={<PageFramework component={<IndividualTrends />} />} />
        </Routes>
    );

};
export default App;