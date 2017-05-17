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
    user_name: payload.username,
    email: payload.email,
    password: payload.password
  };
  console.log("register");
  console.log(userData);
  const registerAccount = new Promise(function(resolve, reject) {
    app.service('users').create(userData)
      .then((result) => {
        resolve({
          isRegistered: true,
          user: result
        });
      })
      .catch((error) => {
        console.log(error);
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
  console.log(payload);
  const userData = payload ?
    {
      strategy: 'local',
      user_name: payload.username,
      password: payload.password
    } :
    undefined;

  const authenticateAccount = new Promise(function(resolve, reject) {
    app.authenticate(userData)
    .then(response => {
      return app.passport.verifyJWT(response.accessToken);
    })
    .then(payload => {
      console.log(app.service('users').get(payload.userId));
      resolve({
        isAuthenticated: true,
        user: app.service('users').get(payload.userId)
      });
    })
    .catch(error => {
      console.log(error);
      reject(error);
    });
  });

  return authenticateAccount
    .then((response) => ({type: AUTHENTICATE_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}
