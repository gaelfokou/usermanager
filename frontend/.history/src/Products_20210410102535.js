import React, { useEffect, useState } from 'react';
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

const Products = ({ match, products }) => {
  const [state, setState] = useState({title: true});

  useEffect(() => {
    console.log('render products!');

    state.title && (document.title = "Products");

    return () => {
      console.log('unmounting products...');
    }
  }, [state.title]);

  const onReverseData = () => {
    let data = [...products];
    let reverseData = data.reverse();
    return reverseData;
  }

  /* Create an array of `<li>` items for each product */
  const productsList = onReverseData().map((product) => {
    return (
      <li key={product.id}>
        <Link to={`${match.url}/${product.id}`}>{`${product.id}- ${product.name}`}</Link>
      </li>
    );
  });

  return (
    <div>
      <div>
        <div>
          <div>Products</div>
          <ul>{productsList}</ul>
        </div>
      </div>

      <Route
        path={`${match.url}/:productId`}
        render={(props) => <Product data={products} {...props} setProductState={setState} />}
      />
      <Route
        exact
        path={match.url}
        render={() => <div>Please select a product.</div>}
      />
    </div>
  );
};

const Product = ({ match, data, setProductState }) => {
  const [state, setState] = useState({});

  var product = data.find(p => p.id == match.params.productId);

  useEffect(() => {
    console.log('render product!');

    document.title = product.name;

    setProductState({title: false});

    return () => {
      console.log('unmounting product...');

      setProductState({title: true});
    }
  }, [match.params.productId]);

  var productData;

  if (product)
    productData = (
      <div>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <hr />
        <h4>{product.status}</h4>{" "}
      </div>
    );
  else productData = <h4>Sorry. Product doesn't exist</h4>;

  return (
    <div>
      <div>{productData}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps)(Products);
