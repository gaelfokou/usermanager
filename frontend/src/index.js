import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
// import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap4-datetimepicker';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { withReduxProvider } from "./store";

const Routing = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const RoutingProvider = withReduxProvider(Routing);

ReactDOM.render(
  <RoutingProvider />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
