import React, { useEffect, useState } from 'react';
// import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFillUser, fetchAddUser, fetchResetUser } from './actions';
import { Link } from "react-router-dom";
import routes from './routes';
import {toastr} from 'react-redux-toastr';

const Home = () => {
  const [state, setState] = useState({});

  const dispatch = useDispatch();
  const { loading, user, hasErrors } = useSelector(state => state.users);

  const propFillUser = (event) => dispatch(fetchFillUser(event));
  const propResetUser = () => dispatch(fetchResetUser());
  const propAddUser = (user, callbackAddUser) => dispatch(fetchAddUser(user, callbackAddUser));

  useEffect(() => {
    document.title = routes.home.title;

    $('.navbar-nav').on('click', '.nav-item', function () {
      $('.nav-item').removeClass('active');
      $(this).addClass('active');
    });

    if (!$('#search-form').hasClass('d-none')) {
      $('#search-form').addClass('d-none');
    }

    $('#age').datetimepicker({
      format: 'YYYY-MM-DD',
      icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down',
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-check',
          clear: 'fa fa-trash',
          close: 'fa fa-times'
      }
    });

    console.log('user', user);
    console.log('loading', loading);
    console.log('hasErrors', hasErrors);

    return () => {
      console.log('unmounting app...');
    }
  }, []);

  const handleChange = (event) => {
    propFillUser(event);
  };

  const clearUser = (event) => {
    event.preventDefault();

    propResetUser();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    propAddUser(user, (data) => {
      console.log('data', data);

      if (data.success) {
        toastr.success(data.title, data.message);
        propResetUser();
      } else {
        if (data.type == 'warning') {
          toastr.warning(data.title, data.message);
        } else {
          toastr.error(data.title, data.message);
        }
      }
    });
  };

  return (
    <div>
      { loading && (<nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Loading...</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>)
      }

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">{routes.home.title}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="username"
            value={user.username}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="E-mail"
            id="email"
            value={user.email}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
            value={user.password}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            id="confirm_password"
            value={user.confirm_password}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            id="first_name"
            value={user.first_name}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            id="last_name"
            value={user.last_name}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Hometown"
            id="hometown"
            value={user.userprofile.hometown}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Age"
            id="age"
            value={user.userprofile.age}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            id="gender"
            value={user.userprofile.gender}
            onChange={(event) => handleChange(event)}>
            <option>Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
        <button
          type="button"
          className="btn btn-outline-primary ml-1"
          onClick={(event) => clearUser(event)}
        >Annuler</button>
      </form>
    </div>
  );
};

export default Home;
