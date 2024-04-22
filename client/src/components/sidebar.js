import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faArchive, faCalculator, faChartSimple, faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";
import emoryLogo from '../images/emory.png';

import "bootstrap/dist/css/bootstrap.css";
import '../styles/styles.css';


/**
 * Renders the Sidebar component.
 * @returns {JSX.Element} The Sidebar component.
 */

export default function SidebarComp() {
    return (
        <Sidebar className="sidebar noPrint">
            <img style={{ "width": 250 + 'px', "height": 250 + "px" }} src={emoryLogo}></img>
            <Menu className="menu">
                <MenuItem className="menu-item" component={<Link to="/" />}>
                    <div className="sidebar-content">
                        <FontAwesomeIcon icon={faUsers}/>
                        Patients
                    </div>
                </MenuItem>
                <MenuItem className="menu-item" component={<Link to="/calculator" />}>
                    <div className="sidebar-content">
                        <FontAwesomeIcon icon={faCalculator}/>
                        Calculate
                    </div>
                </MenuItem>
                <MenuItem className="menu-item" component={<Link to="/trends" />}>
                    <div className="sidebar-content">
                        <FontAwesomeIcon icon={faChartSimple}/>
                        Trends
                    </div>
                </MenuItem>
                <MenuItem className="menu-item" component={<Link to="/archive" />}>
                    <div className="sidebar-content">
                        <FontAwesomeIcon icon={faArchive}/>
                        Archive
                    </div>
                </MenuItem>
                <MenuItem className="menu-item">
                    <div className="sidebar-content">
                        <FontAwesomeIcon icon={faSignOut}/>
                        Log Out
                    </div>
                </MenuItem>
            </Menu>
        </Sidebar>

    );
}