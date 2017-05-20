import {
  LOGOUT_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  AUTHENTICATE_ACCOUNT_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/auth/AuthState';

import app from '../feathers';

export function logoutAccountService (payload) {

  const logoutAccount = new Promise(function(resolve, reject) {
    app.logout()
      .then((result) => {
        resolve({
          isLoggedOut: true
        });
      })
      .catch((error) => {
        reject(error)
      });
  });

  return logoutAccount
    .then((response) => ({type: LOGOUT_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}

export function registerAccountService (payload) {
  const userData = {
    usernames: payload.usernames,
    email: payload.email,
    password: payload.password
  };
  const registerAccount = new Promise(function(resolve, reject) {
    app.service('users').create(userData)
      .then((response) => {
        resolve({
          isRegistered: true,
          user: Object.assign({}, response, {password: payload.password})
        });
      })
      .catch((error) => {
        reject(error)
      });
  });

  return registerAccount
    .then((response) => ({type: REGISTER_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}

export function deleteAccountService (payload) {

  const deleteAccount = new Promise(function(resolve, reject) {

  });

  return deleteAccount
    .then((response) => ({type: DELETE_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}

export function authenticateAccountService (payload) {
  const userData = payload ?
    {
      strategy: 'local',
      usernames: payload.usernames,
      password: payload.password
    } :
    undefined;

  const authenticateAccount = new Promise(function(resolve, reject) {
    app.authenticate(userData)
    .then(response => {
      return app.passport.verifyJWT(response.accessToken);
    })
    .then(response => {
      return app.service('users').get(response.userId);
    })
    .then(response => {
      resolve({
        isAuthenticated: true,
        user: response
      });
    })
    .catch(error => {
      reject(error);
    });
  });

  return authenticateAccount
    .then((response) => ({type: AUTHENTICATE_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}
