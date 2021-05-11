import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({location, handleClick, label, children}) => (
  <Link to={location}>
    <button onClick={handleClick} label={label} variant="raised">
      {children}
    </button>
  </Link>
)

const Home = ({props}) =>
   (
    <div className="App">
      <h1>Content Manager</h1>
      {/* Link to List.js */}
      <LinkButton location='./content/all' label='all-content' handleClick={props} children='All Content'>
        All Content
      </LinkButton>

      <LinkButton location='./content/' label='add-content' handleClick={props} children='Add Content'>
        Add Content
      </LinkButton>

      <LinkButton location='./users/all' label='all-users' handleClick={props} children='All Users'>
        All Users
      </LinkButton>

      <LinkButton location='./users/' label='add-content' handleClick={props} children='Add User'>
        Add User
      </LinkButton>
    </div>
    );

export default Home;
