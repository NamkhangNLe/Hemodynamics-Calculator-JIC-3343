import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

/**
 * Renders the Sidebar component.
 * @returns {JSX.Element} The Navbar component.
 */

export default function SidebarComp() {
    return (
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
    );
   }