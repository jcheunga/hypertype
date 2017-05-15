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
    username: payload.username,
    email: payload.email,
    password: payload.password
  };
  const registerAccount = new Promise(function(resolve, reject) {
    console.log(app);
    app.service('users').create(userData)
      .then((result) => {
        console.log(result);
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
  const userData = payload ?
    {
      strategy: 'local',
      email: payload.username,
      password: payload.password
    } :
    undefined;

  const authenticateAccount = new Promise(function(resolve, reject) {
    console.log("starting auth");
    app.authenticate(userData)
    .then(response => {
      console.log(response);
      return app.passport.verifyJWT(response.accessToken);
    })
    .then(payload => {
      console.log(payload);
      resolve({
        isAuthenticated: true,
        user: app.service('users').get(payload.userId)
      });
    })
    .catch(error => {
      console.log(error);
      reject(error);
    });


    // _authenticate(userData).then(user => {
    //   console.log('authenticated successfully');
    //   resolve({
    //     isAuthenticated: true,
    //     user: user
    //   });
    // })
    // .catch(error => {
    //   console.log('authenticated failed', error.message);
    //   reject(error);
    // });

    // function _authenticate(userData) {
    //   return app.authenticate(userData)
    //     .then(response => {
    //       return app.passport.verifyJWT(response.accessToken);
    //     })
    //     .then(payload => {
    //       console.log(payload);
    //       return app.service('users').get(payload.userId);
    //     })
    //     .catch(error => {reject(error)});
    // }
  });

  return authenticateAccount
    .then((response) => ({type: AUTHENTICATE_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}
