import {
  LOGIN_ACCOUNT_SUCCESS,
  LOGOUT_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  AUTHENTICATE_ACCOUNT_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/auth/AuthState';

import app from '../feathers';

export function loginAccountService (payload) {

  const loginAccount = new Promise(function(resolve, reject) {
    const userData = {
      username: payload.username,
      email: payload.email,
      password: payload.password
    };
    // return authenticate(payload);
  });

  return loginAccount
    .then((response) => ({type: LOGIN_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}

export function logoutAccountService (payload) {

  const logoutAccount = new Promise(function(resolve, reject) {
    app.logout()
      .then((result) => {
        console.log(result);
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
    username: payload.username,
    email: payload.email,
    password: payload.password
  };
  const registerAccount = new Promise(function(resolve, reject) {
    app.service('users').create(userData)
      .then((result) => {
        resolve({
          isRegistered: true,
          user: result
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
  console.log(payload);
  if (payload) {
    const userData = {
      strategy: 'local',
      username: payload.username,
      password: payload.password
    };
  }

  const authenticateAccount = new Promise(function(resolve, reject) {
    console.log("started");
    if (payload) {
      authenticate(userData);
    } else {
      authenticate();
    }

    function authenticate(options) {
      options = options ? options : undefined;
      return this._authenticate(options).then(user => {
        console.log('authenticated successfully', user._id, user.email);
        return Promise.resolve(user);
      }).catch(error => {
        console.log('authenticated failed', error.message);
        console.log(error);
        return Promise.reject(error);
      });
    }

    function _authenticate(payload) {
      return app.authenticate(payload)
        .then(response => {
          return app.passport.verifyJWT(response.accessToken);
        })
        .then(payload => {
          return app.service('users').get(payload.userId);
        }).catch(e => Promise.reject(e));
    }
  });

  return authenticateAccount
    .then((response) => ({type: AUTHENTICATE_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}
