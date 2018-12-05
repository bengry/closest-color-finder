import React from 'react';
import ReactDOM from 'react-dom';
import { NearestColorContainer } from './NearestColorContainer';

import './styles.css';

function App() {
  return (
    <div className="App">
      <h1>Nearest Color</h1>
      <NearestColorContainer />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
