import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import storeSynchronize from "redux-localstore";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import ReduxToastr from 'react-redux-toastr';

const store = createStore(rootReducer, applyMiddleware(thunk));

storeSynchronize(store, {
  whitelist: ["users"],
});

const withReduxProvider = Component => props => (
  <Provider store={store}>
    <Component {...props} />
    <ReduxToastr
      getState={(state) => state.toastr} // This is the default
      progressBar
      closeOnToastrClick
    />
  </Provider>
)

export {
  withReduxProvider,
};
