import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./reducers";
import { Provider } from "react-redux";

const WithReduxProvider = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
)

export {
  WithReduxProvider,
};
