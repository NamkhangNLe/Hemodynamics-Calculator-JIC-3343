import React from "react";

import {Routes, Route} from "react-router-dom";

import Navbar from "../components/navbar";
import RecordList from "../components/recordList";
import Edit from "../components/edit";
import Create from "../components/create";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
 
const Patients = () => {
    return (
        <div className="app-container">
            <Navbar />
            <div className="content-container">
            <Sidebar>
                <Menu>
                <SubMenu label="Patients">
                    <MenuItem component={<Link to="/patients" />}> Create and View Patients </MenuItem>
                    <MenuItem> Medication Info </MenuItem>
                </SubMenu>
                <MenuItem component={<Link to="/calculator" />}> Calculate </MenuItem>
                <MenuItem> Trends </MenuItem>
                <MenuItem> Settings </MenuItem>
                <MenuItem> Log Out </MenuItem>
                </Menu>
            </Sidebar>

            <div className="main-content">
                <Routes>
                    <Route exact path="/" element={<RecordList />} />
                    <Route path="/edit/:id" element={<Edit />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </div>
            </div>
        </div>
    );
};
 
export default Patients;