import React, { Component } from "react";
import { Link } from "react-router-dom";
import {} from "react-router-dom";

const Footer = ({ props }) => {
  return (
    <div>
      <Link to="/">
        <button
          onClick={props}
          className="btn btn-outline-dark"
          alt="home-icon"
        >
          Home
        </button>
      </Link>
    </div>
  );
};

export default Footer;
