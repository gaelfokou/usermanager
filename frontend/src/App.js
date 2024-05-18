import React, { useEffect, useState } from 'react';
import { fetchListUsers } from './actions'
import { connect } from "react-redux";
import routes from './routes';
import Notfound from './Notfound';
import { Route, Link, Switch, useHistory } from "react-router-dom";

const App = ({ propListUsers, loading, hasErrors }) => {
  useEffect(() => {
    console.log('render app!');

    $('.navbar-brand').on('click', function () {
      $('.nav-item').removeClass('active');
      $('.nav-item:eq(0)').addClass('active');
    });

    return () => {
      console.log('unmounting app...');
    }
  }, []);

  const history = useHistory();
  
  const handlePush = (path) => {
      history.push(path);
  }

  const handleChange = (event) => {
    propListUsers(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#" onClick={() => handlePush(routes.home.path)}>Menu</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" onClick={() => handlePush(routes.home.path)}>{routes.home.title}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => handlePush(routes.users.path)}>{routes.users.title}</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 d-none" id="search-form" onSubmit={(event) => handleSubmit(event)}>
            <input
              type="search"
              className="form-control mr-sm-2"
              placeholder="Rechercher un utilisateur"
              aria-label="Search"
              id="search"
              onChange={(event) => handleChange(event)}
              onFocus={() => handlePush(routes.users.path)}
            />
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Rechercher</button>
          </form>
        </div>
      </nav>

      <div className="container-fluid">
        <Switch>
          <Route {...routes.home} />
          <Route {...routes.users} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    propListUsers: (search) => dispatch(fetchListUsers(search)),
  };
};

export default connect(null, mapDispatchToProps)(App);
