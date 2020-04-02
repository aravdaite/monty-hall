import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Monty from './containers/Monty';
import { Toolbar, Footer, About } from './components';
import './App.css';

const App = () => (
  <div>
    <BrowserRouter>
      <Toolbar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Monty} />
      </Switch>
    </BrowserRouter>
    <Footer />
  </div >
)

export default App;