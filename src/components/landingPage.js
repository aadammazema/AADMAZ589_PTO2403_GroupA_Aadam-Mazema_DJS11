import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="main-title">ListenUp.</h1>
      <p>Your World, Your Sound.</p>
      <Link to="/showlist">
        <div>
          <button className="view-all-button">View All Shows</button>
        </div>
      </Link>
      <footer className="footer">
        <ul className="social-list">
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-x"></i>
            </a>
          </li>
          <li className="social-list__item">
            <a
              className="social-list__link"
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default LandingPage;
