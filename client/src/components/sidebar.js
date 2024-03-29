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
            <Menu className="menu">
                <SubMenu className="submenu" label="Patients">
                    <MenuItem className="submenu-item" component={<Link to="/" />}> Create and View Patients </MenuItem>
                    <MenuItem className="submenu-item" component={<Link to="/archive" />}> Archived Patients </MenuItem>
                </SubMenu>
                <MenuItem className="menu-item" component={<Link to="/calculator" />}> Calculate </MenuItem>
                <MenuItem className="menu-item" component={<Link to="/trends" />}> Trends </MenuItem>
                <MenuItem className="menu-item"> Settings </MenuItem>
                <MenuItem className="menu-item"> Log Out </MenuItem>
            </Menu>
        </Sidebar>
    );
}