import React from "react";

import {Routes, Route} from "react-router-dom";

import Navbar from "../components/navbar";
import RecordList from "../components/recordList";
import Edit from "../components/edit";
import Create from "../components/create";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
 
const Calculator = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <Sidebar>
                <Menu>
                <SubMenu label="Patients">
                    <MenuItem component={<Link to="/" />}> Create and View Patients </MenuItem>
                    <MenuItem> Medication Info </MenuItem>
                </SubMenu>
                <MenuItem component={<Link to="/calculator" />}> Calculate </MenuItem>
                <MenuItem> Trends </MenuItem>
                <MenuItem> Settings </MenuItem>
                <MenuItem> Log Out </MenuItem>
                </Menu>
            </Sidebar>

            <div className="main-content">
                <h1>Calculator Goes Here</h1>
            </div>
            </div>
        </div>
    );
};
 
export default Calculator;