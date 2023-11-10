import logo from './logo.svg';
import './App.css';

/**
 * Renders the main App component.
 * Edit <code>src/App.js</code> and save to reload.
 * @returns {JSX.Element} The App component
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hemodynamics Calculator
        </p>
        <a
          className="App-link"
          href="https://github.com/NamkhangNLe/Hemodynamics-Calculator"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </header>
    </div>
  );
}

export default App;