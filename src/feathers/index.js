import io from 'socket.io-client';
import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication-client';

import reduxifyServices, { getServicesStatus } from 'feathers-reduxify-services';
import reduxifyAuthentication from 'feathers-reduxify-authentication';

const API_URL = 'http://localhost:9090';
const options = {transports: ['websocket'], pingTimeout: 3000, pingInterval: 5000};
const socket = io(API_URL, options);

const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({
    storage: AsyncStorage // To store our accessToken
  }));

export default app;

// See feathers-reduxify-services::default
const mapServicePathsToNames = {
  users: 'users',
  posts: 'posts'
};

// See feathers-reduxify-services::getServicesStatus. Order highest priority msg first.
const prioritizedListServices = ['auth', 'users', 'posts'];

// Reduxify feathers-authentication
export const feathersAuthentication = reduxifyAuthentication(app);
  // { isUserAuthorized: (user) => user.isVerified } // user must be verified to authenticate
// );

// Reduxify feathers services
export const feathersServices = reduxifyServices(app, mapServicePathsToNames);

// Convenience method to get status of feathers services, incl feathers-authentication
// export const getFeathersStatus =
//   (servicesRootState, names = prioritizedListServices) =>
//     getServicesStatus(servicesRootState, names);