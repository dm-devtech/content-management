import React, { Component } from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ location, handleClick, label, className, children }) => (
  <Link to={location}>
    <button
      className={className}
      onClick={handleClick}
      label={label}
      variant="raised"
    >
      {children}
    </button>
  </Link>
);

const Home = ({ props }) => (
  <div>
    <h1 class="h1">Content Manager</h1>
    <div>
      <LinkButton
        className="btn btn-outline-dark"
        location="./content/all"
        label="all-content"
        handleClick={props}
        children="All Content"
      >
        All Content
      </LinkButton>

      <LinkButton
        className="btn btn-outline-dark"
        location="./content/"
        label="add-content"
        handleClick={props}
        children="Add Content"
      >
        Add Content
      </LinkButton>

      <LinkButton
        className="btn btn-outline-dark"
        location="./users/all"
        label="all-users"
        handleClick={props}
        children="All Users"
      >
        All Users
      </LinkButton>

      <LinkButton
        className="btn btn-outline-dark"
        location="./users/"
        label="add-users"
        handleClick={props}
        children="Add User"
      >
        Add User
      </LinkButton>
    </div>
    <br />
    <h1 class="h6">© David Millen 2021</h1>
  </div>
);

export default Home;
