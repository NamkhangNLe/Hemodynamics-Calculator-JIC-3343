import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import '../styles/styles.css';


/**
 * Renders the Sidebar component.
 * @returns {JSX.Element} The Navbar component.
 */

export default function SidebarComp() {
    return (
        <Sidebar className="sidebar">
            <img style={{ "width": 100 + '%', "height": 25 + "%" }} src="emory.png"></img>
            <Menu className="menu">
                <MenuItem className="menu-item" component={<Link to="/" />}> Patients </MenuItem>
                <MenuItem className="menu-item" component={<Link to="/calculator" />}> Calculate </MenuItem>
                <MenuItem className="menu-item" component={<Link to="/trends" />}> Trends </MenuItem>
                <MenuItem className="menu-item" component={<Link to="/archive" />}> Archive </MenuItem>
                <MenuItem className="menu-item"> Settings </MenuItem>
                <MenuItem className="menu-item"> Log Out </MenuItem>
            </Menu>
        </Sidebar>
    );
}