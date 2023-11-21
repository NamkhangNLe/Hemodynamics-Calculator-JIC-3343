import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

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
  <div className="app-container">
    <Navbar />

    <div className="content-container">
      <Sidebar>
        <Menu>
          <SubMenu label="Patients">
            <MenuItem> Create and View Patients </MenuItem>
            <MenuItem> Medication Info </MenuItem>
          </SubMenu>
          <MenuItem> Calculate </MenuItem>
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
 export default App;