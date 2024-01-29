import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css";
import '../styles/styles.css';

/**
 * Renders the Sidebar component.
 * @returns {JSX.Element} The Navbar component.
 */

export default function SidebarComp() {
    return (
        <Sidebar className="sidebar">
            <Menu className="sidebar">
            <SubMenu label="Patients">
                <MenuItem className="sidebar" component={<Link className="sidebar" to="/" />}> Create and View Patients </MenuItem>
                <MenuItem className="sidebar"> Medication Info </MenuItem>
            </SubMenu>
            <MenuItem className="sidebar" component={<Link className="sidebar" to="/calculator" />}> Calculate </MenuItem>
            <MenuItem className="sidebar"> Trends </MenuItem>
            <MenuItem className="sidebar"> Settings </MenuItem>
            <MenuItem className="sidebar"> Log Out </MenuItem>
            </Menu>
        </Sidebar>
    );
}