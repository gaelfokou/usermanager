import React, { useEffect, useState } from 'react';
import { fetchFillProduct, fetchAddProduct, fetchResetProduct, fetchClearProducts } from './actions'
import { connect } from "react-redux";

const App = ({ propFillProduct, propAddProduct, propResetProduct, propClearProducts, loading, products, product, hasErrors }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    console.log('render app!');
    console.log('products', products);
    console.log('product', product);
    console.log('loading', loading);
    console.log('hasErrors', hasErrors);
    document.title = "App";
    $("#id").focus();

    return () => {
      console.log('unmounting app...');
    }
  });

  const handleChange = (event) => {
    propFillProduct(event);
  };

  const clearProduct = (event) => {
    event.preventDefault();

    propClearProducts();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    propAddProduct(product);

    propResetProduct();
  };

  const onReverseData = () => {
    let data = [...products];
    let reverseData = data.reverse();
    let sliceData = reverseData.slice(0, 5);
    return sliceData;
  }

  const productsList = onReverseData().map((product) => {
    return (
      <li key={product.id}>
        {`${product.id}- ${product.name}`}
      </li>
    );
  });

  return (
    <div>
      <div>Add new Product</div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label htmlFor="id">Id</label>
          <input
            type="text"
            id="id"
            value={product.id}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={product.name}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={product.description}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            id="status"
            value={product.status}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={(event) => clearProduct(event)}
        >Clear</button>
      </form>
      <ul>{productsList}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.products.loading,
  products: state.products.products,
  product: state.products.product,
  hasErrors: state.products.hasErrors,
});

const mapDispatchToProps = (dispatch) => {
  return {
    propFillProduct: (event) => dispatch(fetchFillProduct(event)),
    propResetProduct: () => dispatch(fetchResetProduct()),
    propClearProducts: () => dispatch(fetchClearProducts()),
    propAddProduct: (product) => dispatch(fetchAddProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
