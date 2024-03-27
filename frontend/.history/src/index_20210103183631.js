import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Category from './Category';
import Products from './Products';
import reportWebVitals from './reportWebVitals';
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { withReduxProvider } from "./store";

const Routing = () => (
  <Router>
    <React.StrictMode>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">App</Link>
          </li>
          <li>
            <Link to="/category">Category</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/category" component={Category} />
        <Route path="/products" component={Products} />
      </Switch>
    </React.StrictMode>
  </Router>
)

const RoutingProvider = withReduxProvider(Routing);

ReactDOM.render(
  <RoutingProvider />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
