# Hemodynamics Calculator - Emory School of Medicine (v0.1.0)

Welcome to the Hemodynamics Calculator! Built for the Emory School of Medicine's Cardiac ICU, this tool is desgined to assist healthcare professionals and clinicians in the ICU, providing a streamlined, user-friendly interface to calculate, track, and analyze hemodynamic values and trends for patients.

## Platform Description and Tech Stack

This application uses the MERN Tech Stack (MongoDB, ExpressJS, React, Node). 

- **MongoDB:**  MongoDB's document-oriented database allows efficient storage and retrieval of patient profiles, data, and trends. It provides the foundation for our patient database system, and is scalable so that should the application need to expand, we have the capacity to do so. 
- **Express.JS:** Paired with Node, Express allows the creation of RESTful APIs, allowing for efficient and easy access from our backend MongoDB database to our front-end.
- **React:** React's component-based architecture provides the application with a myriad of easy-to-implement, interactive elements. This provides a foundation for our intuitive UX and UI to be built off of.
- **Node.JS:** Paired with Express, Node allows us to easily integrate our front-end components with our back-end database through its "JavaScript Everywhere" format.

This application is designed to be accessed from web browsers on MacOS, Windows, and Linux desktops and laptops. The application is primarily written in JavaScript due to its simplicity and ease of integration with Node.js. CSS, HTML, as well as React-specific components are also used to provide a visually appealing and easy-to-use front-end for users.

## Version 0.1.0 - Basic Patient Profile System

For our current artifact implementation of this application, version 0.1.0, we have decided to implement the basic patient screen. The current application allows users to create patient profiles, with the following fields for patients:

- Patient Initials/Identifier
- Date of Birth
- Sex
- Height
- Weight
- Patient Medications

This basic patient system is the backbone of the application, as users must be able to save calculations and view trends for these patients. While specific data fields will be included in future updates, this version of our product provides the necessary foundation for us to expand further.

## Setup Instructions (Run Locally)

To get started with the Hemodynamics Calculator, follow these steps:
1. First, make sure you have node and npm installed. You can do this by downloading node.js (https://nodejs.org/en/download), or using nvm to install node and npm. To check if you have node/npm installed, you can run the following command, which will output the version of node/npm you currently have.
```bash
npm -v
```
2. Next, make sure you install the MongoDB, Express, cors, and dotenv with npm:
   
```bash
npm install mongodb express cors dotenv
```
3. Once this is complete, go to cloud.mongodb.com and log in with our team gmail account. Under the "Network Access" tab, add your current IP address, and comment your name as well as the date/time (for example: "Mark - 12/25, 3pm"). This is important if you are on Georgia Tech eduroam, as the IP addresses change routinely.

4. Now, open up the repository and add a file "config.env" under the "Server" folder. Add "ATLAS_URI=[mongodb link]" to the file. [mongodb link] can be obtained. Note that if this is already done, you don't need to do it again.

5. We first start by running the local server. Open up a bash terminal, and navigate to the "server" directory in the repository. Then, run the following command to run the server. After a minute, you should see that the server is running on localhost:5000 (port 5000). Note that if you are using Mac, make sure to turn off Airdrop in order for this to work.

```bash
node server.js
```

6. Once the server is running, open up a separate bash terminal and navigate to the "client" directory in the repository. Then, run the following command to run the client side. The application should now be running locally on localhost:3000. Open up your browser and go to this URL, and you should see the site!
```bash
npm start
```

## License

This Hemodynamics Calculator is distributed under the [MIT License](https://example.com/hemodynamics-calculator-license), which allows for both personal and commercial use. Please review the license for more details.
