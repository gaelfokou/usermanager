import React, { useEffect, useState } from 'react';
// import $ from 'jquery';
import { fetchEditUser, fetchResetUser, fetchListUsers, fetchDeleteUser } from './actions'
import { Route, Link, useHistory } from "react-router-dom";
import routes from './routes';
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from 'moment';
import {toastr} from 'react-redux-toastr';

const Users = ({ propListUsers, propDeleteUser, match, loading, users, count, next, previous, hasErrors }) => {
  const [state, setState] = useState({title: true, page: 1, sizePerPage: Number.parseInt(process.env.PAGE_SIZE)});

  useEffect(() => {
    console.log('render users!');

    state.title && (document.title = routes.users.title);

    $('.navbar-nav').on('click', '.nav-item', function () {
      $('.nav-item').removeClass('active');
      $(this).addClass('active');
    });

    if ($('#search-form').hasClass('d-none')) {
      $('#search-form').removeClass('d-none');
    }

    state.title && propListUsers($('#search').val(), state.page, state.sizePerPage);

    console.log('users', users);
    console.log('loading', loading);
    console.log('hasErrors', hasErrors);

    return () => {
      console.log('unmounting users...');
    }
  }, [state]);

  const history = useHistory();
  
  const handlePush = (path) => {
      history.push(path);
  }

  const handleClick = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) propDeleteUser(id);
  };

  const handlePageChange = (page, sizePerPage) => {
    console.log('tototototototo page 1 :', page);
    console.log('tototototototo sizePerPage 1 :', sizePerPage);
  };

  const options = {
    page: state.page,
    sizePerPage: state.sizePerPage,
    totalSize: count,
    sizePerPageList: [5, 10, 25, 50],
    onPageChange: (page) => {
      setState({...state, page});
    },
    onSizePerPageChange: (sizePerPage) => {
      setState({...state, sizePerPage});
    },
  };

  const columns = [
    {
      dataField: "first_name",
      text: "Name",
      formatter: (cell, row) => {
        return `${row.first_name} ${row.last_name}`;
      }
    },
    {
      dataField: "username",
      text: "Username"
    },
    {
      dataField: "email",
      text: "E-mail"
    },
    {
      dataField: "date_joined",
      text: "Date joined",
      formatter: (cell, row) => {
        return `${moment(row.date_joined).format('DD-MM-YYYY')}`;
      }
    },
    {
      dataField: "id",
      text: "Actions",
      formatter: (cell, row) => {
        return (
          <div>
            <p><a href="#" onClick={() => handlePush(`${match.path}/${row.id}`)}>Afficher</a></p>
            <p><a href="#" onClick={() => handlePush(`${match.path}/edit/${row.id}`)}>Modifier</a></p>
            <p><a href="#" onClick={() => handleClick(row.id)}>Supprimer</a></p>
          </div>
        );
      }
    },
  ];

  return (
    <div>
      { loading && (<nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Loading...</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>)
      }

      { state.title && (<nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">{routes.users.title}</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>)
      }

      { state.title && (<BootstrapTable
          bootstrap4
          keyField="id"
          data={users}
          columns={columns}
          pagination={paginationFactory(options)}
        />)
      }

      <Route
        path={`${match.path}/:userId`}
        render={(props) => <User data={users} {...props} state={state} setState={setState} />}
      />
      <Route
        path={`${match.path}/edit/:userId`}
        render={(props) => <EditUser data={users} {...props} state={state} setState={setState} />}
      />
    </div>
  );
};

const User = ({ match, data, state, setState }) => {
  var user = data.find(p => p.id == match.params.userId);

  useEffect(() => {
    console.log('render user!');

    user && (document.title = `${user.first_name} ${user.last_name}`);

    console.log('user', user);

    setState({...state, title: false});

    return () => {
      console.log('unmounting user...');

      setState({...state, title: true});
    }
  }, [match.params.userId]);

  var userData;

  if (user)
    userData = (
      <div className="card">
        <div className="card-header">
          {`${user.first_name} ${user.last_name}`}
        </div>
        <div className="card-body">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">{user.email}</p>
          <p className="card-text">{user.userprofile ? `${moment().diff(user.userprofile.age, 'years')} an(s)` : ''}</p>
          <p className="card-text">{user.userprofile.gender}</p>
          <p className="card-text">{user.userprofile.hometown}</p>
          <p className="card-text">{`${moment(user.date_joined).format('DD-MM-YYYY')}`}</p>
        </div>
      </div>
    );
  else
    userData = (
      <div className="card">
        <div className="card-header">
          Sorry. User doesn't exist
        </div>
      </div>
    );

  return (
    <div>{userData}</div>
  );
};

const Edit = ({ propEditUser, propResetUser, loading, user, hasErrors, match, data, state, setState }) => {
  var user = data.find(p => p.id == match.params.userId);
  user && (user.password = '');
  user && (user.confirm_password = '');
  const [stateUser, setStateUser] = user ? useState({...user}) : useState({});

  useEffect(() => {
    console.log('render edit!');

    user && (document.title = `${user.first_name} ${user.last_name}`);

    console.log('user', user);

    setState({...state, title: false});

    return () => {
      console.log('unmounting edit...');

      setState({...state, title: true});
    }
  }, [match.params.userId]);

  const handleChange = (event) => {
    if (event.target.id == 'hometown' || event.target.id == 'age' || event.target.id == 'gender') {
      setStateUser({...stateUser, userprofile: {...stateUser.userprofile, [event.target.id]: event.target.value,},});
    } else {
      setStateUser({...stateUser, [event.target.id]: event.target.value,});
    }
  };

  const clearUser = (event) => {
    event.preventDefault();

    propResetUser();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    propEditUser(stateUser, (data) => {
      console.log('data', data);

      if (data.success) {
        toastr.success(data.title, data.message);
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
        <a className="navbar-brand" href="#">{routes.edit.title}</a>
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
            value={stateUser.username}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="E-mail"
            id="email"
            value={stateUser.email}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
            value={stateUser.password}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            id="confirm_password"
            value={stateUser.confirm_password}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            id="first_name"
            value={stateUser.first_name}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            id="last_name"
            value={stateUser.last_name}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Hometown"
            id="hometown"
            value={stateUser.userprofile.hometown}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Age"
            id="age"
            value={stateUser.userprofile.age}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            id="gender"
            value={stateUser.userprofile.gender}
            onChange={(event) => handleChange(event)}>
            <option>Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Modifier</button>
        <button
          type="button"
          className="btn btn-outline-primary ml-1"
          onClick={(event) => clearUser(event)}
        >Annuler</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.users.loading,
  users: state.users.users,
  count: state.users.count,
  next: state.users.next,
  previous: state.users.previous,
  hasErrors: state.users.hasErrors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    propResetUser: () => dispatch(fetchResetUser()),
    propEditUser: (user, callbackEditUser) => dispatch(fetchEditUser(user, callbackEditUser)),
    propListUsers: (search, page, sizePerPage) => dispatch(fetchListUsers(search, page, sizePerPage)),
    propDeleteUser: (id) => dispatch(fetchDeleteUser(id)),
  };
};

const EditUser = connect(mapStateToProps, mapDispatchToProps)(Edit);

export default connect(mapStateToProps, mapDispatchToProps)(Users);
