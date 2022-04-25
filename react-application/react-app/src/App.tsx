import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { Link, Route, Routes } from 'react-router-dom';
import SupplierList from './components/SupplierList';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand m-3">
          DCCS Tuzla
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/suppliers"} className="nav-link">
              Suppliers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"#"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          
          <Route path="/suppliers" element={<SupplierList/>} />
          <Route path="/add" element={<AddCertificate/>} />
          {/* <Route path="/certificates" element={<CertificateList/>} />
          <Route path="/add" element={<AddCertificate/>} />
          <Route path="/tutorials/:id" element={<Certificate/>} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
