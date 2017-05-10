// import io from 'socket.io-client';
const io = require("socket.io-client/dist/socket.io");
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';

import { AsyncStorage } from 'react-native';

// import reduxifyServices, { getServicesStatus } from 'feathers-reduxify-services';
import reduxifyAuthentication from 'feathers-reduxify-authentication';

const API_URL = 'http://10.0.2.2:3030';
const options = {transports: ['websocket'], pingTimeout: 3000, pingInterval: 5000, jsonp: false};
const socket = io(API_URL, options);

const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({
    storage: AsyncStorage // To store our accessToken
  }));

export default app;

// See feathers-reduxify-services::default
// const mapServicePathsToNames = {
//   users: 'users',
//   rooms: 'rooms',
//   multirooms: 'multirooms',
//   highscores: 'highscores'
// };

// See feathers-reduxify-services::getServicesStatus. Order highest priority msg first.
// const prioritizedListServices = ['auth', 'users', 'rooms', 'multirooms', 'highscores'];

// Reduxify feathers-authentication
export const feathersAuthentication = reduxifyAuthentication(app);
  // { isUserAuthorized: (user) => user.isVerified } // user must be verified to authenticate
// );

// Reduxify feathers services
// export const feathersServices = reduxifyServices(app, mapServicePathsToNames);

// Convenience method to get status of feathers services, incl feathers-authentication
// export const getFeathersStatus =
//   (servicesRootState, names = prioritizedListServices) =>
//     getServicesStatus(servicesRootState, names);