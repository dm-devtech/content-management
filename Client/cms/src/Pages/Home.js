import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({location, handleClick, label, className, children}) => (
  <Link to={location}>
    <button className={className} onClick={handleClick} label={label} variant="raised">
      {children}
    </button>
  </Link>
)

const Home = ({props}) =>
   (
    <div>
      <h1>Content Manager</h1>
      {/* Link to List.js */}
      <div>
        <LinkButton className='home-button' location='./content/all' label='all-content' handleClick={props} children='All Content'>
          All Content
        </LinkButton>

        <LinkButton className='home-button' location='./content/' label='add-content' handleClick={props} children='Add Content'>
          Add Content
        </LinkButton>

        <LinkButton className='home-button' location='./users/all' label='all-users' handleClick={props} children='All Users'>
          All Users
        </LinkButton>

        <LinkButton className='home-button' location='./users/' label='add-users' handleClick={props} children='Add User'>
          Add User
        </LinkButton>
      </div>
    </div>
    );

export default Home;
