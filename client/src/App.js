import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import home from './componentes/home';
import landingPage from './componentes/landing_page';
import NavBar from './componentes/navBar';
import pokemonDetail from './componentes/pokemonDetail';
import pokemonCreate from './componentes/pokemonCreate';
function App() {
  
  return (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path = "/" component = {landingPage}/>
        <React.Fragment>
          <NavBar/>
          <Route path = "/home" component = {home}/>
          <Route path = "/create" component = {pokemonCreate}/>
          <Route path = "/pokemon/:id" component = {pokemonDetail}/>
        </React.Fragment>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
