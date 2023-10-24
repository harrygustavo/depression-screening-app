import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import './index.css';

// Create a root container where the tree will be mounted
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your App component to the root container
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
