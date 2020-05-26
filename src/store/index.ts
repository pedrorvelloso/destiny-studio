import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import reducer from './ducks';

import dashboard from './sagas/dashboard';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(dashboard);

export default store;
