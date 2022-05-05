import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { Link, Route, Routes } from 'react-router-dom';
import SupplierList from './components/SupplierList';
import AddSupplier from './components/AddSupplier';
import AddCertificate from './components/AddCertificate';
import CertificateList from './components/CertificateList';
import { NavLink } from 'react-router-dom';


function App() {
  return (

    <Fragment>

      <nav className="navbar navbar-expand-lg  navbar-dark bg-info">
        <a className="navbar-brand" href="/">DCCS Tuzla</a>
      </nav><div className="row wrapper min-vh-100 flex-column flex-sm-row">
        <aside className="col-12 col-sm-2 p-0 flex-shrink-1">
          <nav className="navbar navbar-expand-sm navbar-light bg-light align-items-start flex-sm-column flex-row">

            <ul className="flex-column navbar-nav w-100 justify-content-between">

              <li className="nav-item ml-2">
                <a className="nav-link" href="/">
                  <span>
                    <i className="fa fa-home fa-fw"></i> Start
                  </span>
                </a>
              </li>

              <li className="nav-item ml-2">

                <a className="nav-link" data-toggle="dropdown" aria-expanded="false">
                  <span><i className="fa fa-bars fa-fw"></i> Machine Learning <i
                    className="fa fa-angle-down ml-5"></i></span>

                  <div className='dropdown-item'>
                    <NavLink to="/certificates" className="nav-link">
                      Example 1
                    </NavLink>
                  </div>
                  <div className='dropdown-item'>
                    <NavLink to="/" className="nav-link">
                      Example 2
                    </NavLink>
                  </div>
                  <div className='dropdown-item'>
                    <NavLink to="/" className="nav-link">
                      Example 3
                    </NavLink>
                  </div>

                </a>

              </li>

            </ul>

          </nav>
        </aside>
        <main className="col bg-faded py-3">

          <Routes>

            <Route path="/newCertificate" element={<AddCertificate />} />
            <Route path="/certificates" element={<CertificateList />} />

            {/*
            <Route path="/suppliers" element={<SupplierList/>} />
            <Route path="/add" element={<AddSupplier/>} />
            <Route path="/add" element={<AddCertificate/>} />
            <Route path="/certificates/:id" element={<Certificate/>} /> */}
          </Routes>

        </main>

      </div>

    </Fragment>
  );
}

export default App;


//             <Link to={"/certificates"} className="nav-link">
//               New Certificate
//             </Link>
//
//             <div className="container mt-3">
