import React, { useEffect, useState } from 'react';
import { Route, Link } from "react-router-dom";

const Category = ({ match }) => {
  const [state, setState] = useState({title: true});

  useEffect(() => {
    console.log('render category!');

    state.title && (document.title = "Category");

    return () => {
      console.log('unmounting category...');
    }
  }, [state.title]);

  return (
    <div>
      <div>Category</div>
      <ul>
        <li>
          <Link to={`${match.url}/shoes`}>Shoes</Link>
        </li>
        <li>
          <Link to={`${match.url}/boots`}>Boots</Link>
        </li>
        <li>
          <Link to={`${match.url}/footwear`}>Footwear</Link>
        </li>
      </ul>
      <Route
        path={`${match.url}/:name`}
        render={(props) => <Detail {...props} setDetailState={setState} />}
      />
    </div>
  );
};

const Detail = ({ match, data, setDetailState }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    console.log('render detail!');

    document.title = match.params.name;

    setDetailState({title: false});

    return () => {
      console.log('unmounting detail...');

      setDetailState({title: true});
    }
  }, [match.params.name]);

  return (
    <div>
      <h4>{match.params.name}</h4>
    </div>
  );
};

export default Category;
