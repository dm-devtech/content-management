import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import AllContent from './Pages/AllContent';
import IndividualContent from './Pages/IndividualContent';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/content/all' component={AllContent}/>
          <Route path='/Content/single' component={IndividualContent}/>
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
