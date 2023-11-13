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
3. We first start by running the local server. Open up a bash terminal, and navigate to the "server" directory in the repository. Then, run the following command to run the server:

```bash
node server.js
```
After a minute, you should see that the server is running on localhost:5000 (port 5000). Note that if you are using Mac, make sure to turn off Airdrop in order for this to work.

4. Once the server is running, open up a separate bash terminal and navigate to the "client" directory in the repository. Then, run the following command to run the client side:
```bash
npm start
```
The application should now be running locally on localhost:3000. Open up your browser and go to this URL, and you should see the site!


## Contributing

We welcome contributions from the medical and scientific community to enhance and improve this Hemodynamics Calculator. If you have suggestions, bug reports, or feature requests, please [submit an issue](https://github.com/emorymed/hemodynamics-calculator/issues) on our GitHub repository.

## License

This Hemodynamics Calculator is distributed under the [MIT License](https://example.com/hemodynamics-calculator-license), which allows for both personal and commercial use. Please review the license for more details.

## Contact Information

For inquiries, support, or collaboration opportunities, please contact:

- Emory School of Medicine
- Department of Cardiology
- Email: cardiology@emorymed.edu
- Website: [www.emorymed.edu/cardiology](https://www.emorymed.edu/cardiology)

## Acknowledgments

We would like to acknowledge the contributions of the Emory School of Medicine's Department of Cardiology and the dedicated team of developers and healthcare professionals who have made this Hemodynamics Calculator possible.

Thank you for choosing the Hemodynamics Calculator from Emory School of Medicine. We hope this tool proves to be a valuable asset in your pursuit of excellence in cardiology and hemodynamics research and practice.
