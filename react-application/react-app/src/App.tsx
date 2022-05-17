import React, { Component, Fragment, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import 'bootstrap/dist/css/bootstrap.min.css'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
// import cookies from 'js-cookie'
// import Cookies from 'js-cookie'
import classNames from 'classnames'
import { NavLink, Route, Routes } from 'react-router-dom';
import AddCertificate from './components/AddCertificate';
import CertificateList from './components/CertificateList';
import CertificateComponent from './components/CertificateComponent';
import { render } from 'react-dom';

// support languages collection
const languages = [
  {
    code: 'de',
    name: 'German',
    country_code: 'de',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  }
]

export default function App() {

        // locales setup
        const currentLanguageCode = 'en'
        const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
        const { t } = useTranslation()
        
        useEffect(() => {
          console.log('Setting page stuff')
          //document.body.dir = currentLanguage.dir || 'ltr'
          document.title = t('app_title')
        }, [currentLanguage, t])
    

    return (

      <><nav className="navbar navbar-expand-lg  navbar-dark bg-info justify-content-between">
        <a className="navbar-brand" href="/">DCCS Tuzla</a>

    

      <div className="nav-item dropdown mx-5">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Language: </a>
                            <li className="dropdown-menu" aria-labelledby="dropdown09">
                                
                            {languages.map(({ code, name, country_code }) => (

                                <a href="#" className={ classNames('dropdown-item', {
                                })}
                                onClick={() => {
                                  i18next.changeLanguage(code)
                                }}
                                >
                                  {name}
                                </a>

                            ))}  
                            </li>
                        </div>     

                        <div title='USER NAME'>USER NAME</div>           


      </nav>
      
      <div className="row wrapper min-vh-100 flex-column flex-sm-row">
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
                    <span><i className="fa fa-bars fa-fw"></i> {t('machine_learning')} <i
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
              <Route path="/certificates/:id" element={<CertificateComponent /> } />
            </Routes>
          </main>
        </div></>
    );
  }




