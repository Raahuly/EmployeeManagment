import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import NavBar from './Components/NavBar.tsx';
import FormTable from './Components/FormTable.tsx';
import Table from './Components/Table.tsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Testing from './Components/Testing';

ReactDOM.render(
  <React.StrictMode>
    <Router>
     <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
