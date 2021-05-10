import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Content Manager</h1>
      {/* Link to List.js */}
      <Link to={'./content/all'}>
        <button variant="raised">
          All Content
        </button>
      </Link>
      <Link to={'./content/single'}>
        <button variant="raised">
          Individual Content
        </button>
      </Link>
      <Link to={'./users/add'}>
        <button variant="raised">
          Add User
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;
