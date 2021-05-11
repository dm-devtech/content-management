import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import AllContent from './Pages/AllContent';
import AddContent from './Pages/AddContent';
import AddUser from './Pages/AddUser';
import AllUsers from './Pages/AllUsers';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/content/all' component={AllContent}/>
          <Route path='/content/' component={AddContent}/>
          <Route path='/users/' component={AllUsers}/>
          <Route path='/users/all' component={AddUser}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
