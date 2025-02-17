import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Required for dropdowns & navbar collapse

function Header() {
  return (
    <header>
      {/* Main Header with Two Logos */}
      <div className="bg-primary text-white py-3 d-flex align-items-center justify-content-between px-4">
        <img src="https://via.placeholder.com/50" alt="Logo Left" className="logo" />
        <h1 className="fw-bold text-center flex-grow-1 m-0">Loan Services</h1>
        <img src="https://via.placeholder.com/50" alt="Logo Right" className="logo" />
      </div>

      {/* Responsive Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          {/* Navbar Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items (Collapsible) */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link btn btn-outline-primary mx-2" href="#">Home Loan</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-outline-primary mx-2" href="#">Personal Loan</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-outline-primary mx-2" href="#">Car Loan</a>
              </li>

              {/* Business Loan Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle btn btn-outline-primary mx-2"
                  href="#"
                  id="businessLoanDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Business Loan
                </a>
                <ul className="dropdown-menu" aria-labelledby="businessLoanDropdown">
                  <li><a className="dropdown-item" href="#">Small Business Loan</a></li>
                  <li><a className="dropdown-item" href="#">Startup Loan</a></li>
                  <li><a className="dropdown-item" href="#">Corporate Loan</a></li>
                </ul>
              </li>

              {/* Other Loan Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle btn btn-outline-primary mx-2"
                  href="#"
                  id="otherLoanDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Other Loans
                </a>
                <ul className="dropdown-menu" aria-labelledby="otherLoanDropdown">
                  <li><a className="dropdown-item" href="#">Education Loan</a></li>
                  <li><a className="dropdown-item" href="#">Medical Loan</a></li>
                  <li><a className="dropdown-item" href="#">Gold Loan</a></li>
                  <li><a className="dropdown-item" href="#">Agriculture Loan</a></li>
                  <li><a className="dropdown-item" href="#">Electric Vehicle Loan</a></li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Admin Dashboard Button */}
          <Link to="/admin" className="btn btn-danger ms-3">Admin Dashboard</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
