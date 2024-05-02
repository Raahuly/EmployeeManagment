import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import NavBar from './Components/NavBar.tsx';
import FormTable from './Components/FormTable.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Testing from './Components/Testing';
import Table from './Components/Table.tsx';
import Edit from './Components/Edit.tsx';
import Details from './Components/Details.tsx';
import Register from './Components/Register.tsx';
import Login from './Components/Login.tsx'; 
import Role from './Components/Role.tsx';
import RoleTable from './Components/RoleTable.tsx';
import RoleEdit from './Components/RoleEdit.tsx';


function App() {
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        console.log(decoded);
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
  }, []);

  return (
    <>
     {decodedToken?.Id && (<NavBar />)}
    <p>{decodedToken?.Id}</p>
      <main>
        <Routes>
          <Route path="/FormTable" element={<FormTable />} />
          <Route path="/Testing" element={<Testing />} />
          <Route path="/Table" element={<Table />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/table/:id/edit" element={<Edit />} />
          <Route path="/RoleTable/:id/edit" element={<RoleEdit />} />
          <Route path="/table/:id/Details" element={<Details />} />
          <Route path="/Role" element={<Role />} />
          <Route path="/RoleTable" element={<RoleTable />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
