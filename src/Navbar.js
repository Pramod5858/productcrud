import React from 'react'
import { useNavigate } from 'react-router-dom';
//import {Link, useNavigate} from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const auth = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className='container'>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Product</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {auth ?
            <div className="collapse navbar-collapse" id="navbarSupportedContent">


              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/add">Add</a>
                </li>
              </ul>


              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/admin">Admin</a>
                </li>
              </ul>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" onClick={logout} href="/login">Logout</a>
                </li>
              </ul>
            </div>
            :
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login">Login</a>
                </li>
              </ul>
            </form>
          }
        </div>

      </nav>
    </div>
  )
}
