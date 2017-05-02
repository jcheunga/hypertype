
// import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middleware/loggerMiddleware';
import reduxPromiseMiddleware from 'redux-promise-middleware';

// define store middlewares as an array
export default [
  reduxPromiseMiddleware(),
  thunkMiddleware,
  loggerMiddleware
];
