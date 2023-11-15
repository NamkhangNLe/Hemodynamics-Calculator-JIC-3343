# Hemodynamics Calculator - Emory School of Medicine

Welcome to the Hemodynamics Calculator developed for Emory School of Medicine. This tool is designed to assist healthcare professionals, researchers, and students in the field of cardiology, specifically in the study of hemodynamics. It provides a user-friendly interface to calculate and analyze various hemodynamic parameters, aiding in the assessment and management of cardiovascular health.

## Tech Stack

- **MongoDB:**  MongoDB's flexible and scalable document-oriented structure allows seamless storage and retrieval of real-time hemodynamic information, enabling the calculator to provide accurate and timely analyses for medical professionals in the assessment of cardiovascular health and function.
- **Express.JS:** Express.js enables the creation of robust APIs, allowing the calculator to receive input parameters, process them using hemodynamic algorithms, and then send the calculated results back to the user interface in a seamless and responsive manner.
- **React:** React's component-based architecture enables the seamless integration of interactive elements, ensuring a responsive and intuitive user experience as individuals input and modify variables, instantly visualizing the impact on hemodynamic parameters.
- **Node.JS:** The asynchronous nature of Node.js allows the calculator to seamlessly manage dynamic inputs such as blood pressure, heart rate, and vascular resistance, ensuring responsive and accurate hemodynamic assessments for medical professionals.

### Hemodynamic Parameters

- **Cardiac Output (CO):** Calculate CO using the Fick or thermodilution method.
- **Cardiac Index (CI):** Normalize CO for body surface area.
- **Stroke Volume (SV):** Calculate SV using CO and heart rate.
- **Systemic Vascular Resistance (SVR):** Determine SVR to assess systemic vascular health.
- **Pulmonary Vascular Resistance (PVR):** Calculate PVR to evaluate pulmonary circulation.
- **Mean Arterial Pressure (MAP):** Compute MAP from systolic and diastolic blood pressure.
- **Pulmonary Artery Wedge Pressure (PAWP):** Estimate PAWP for left heart function assessment.

### Features

### Interpretation

- Interpretation guidelines and ranges are provided for each parameter to aid in clinical decision-making.

### Data Logging

- Save patient data and calculations for future reference and analysis.

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

5. Once the server is running, open up a separate bash terminal and navigate to the "client" directory in the repository. Then, run the following command to run the client side. The application should now be running locally on localhost:3000. Open up your browser and go to this URL, and you should see the site!
```bash
npm start
```

## License

This Hemodynamics Calculator is distributed under the [MIT License](https://example.com/hemodynamics-calculator-license), which allows for both personal and commercial use. Please review the license for more details.
