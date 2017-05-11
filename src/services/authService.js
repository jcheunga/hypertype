import {
  LOGIN_ACCOUNT_SUCCESS,
  LOGOUT_ACCOUNT_SUCCESS,
  REGISTER_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  RESPONSE_FAILURE
} from '../modules/auth/AuthState';

import app from '../feathers';

export function loginAccountService (payload) {

  const loginAccount = new Promise(function(resolve, reject) {
    // app.service("highscores")
    //   .find()
    //   .then((res) => {
    //     resolve({
    //       data: res.data,
    //       isFetched: true
    //     });
    //   })
    //   .catch((err) => {
    //     reject({
    //       message: err,
    //       hasError: true
    //     })
    //   });
  });

  return loginAccount
    .then((response) => ({type: LOGIN_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}

export function logoutAccountService (payload) {

  const logoutAccount = new Promise(function(resolve, reject) {
    // app.service("highscores")
    //   .find()
    //   .then((res) => {
    //     resolve({
    //       data: res.data,
    //       isFetched: true
    //     });
    //   })
    //   .catch((err) => {
    //     reject({
    //       message: err,
    //       hasError: true
    //     })
    //   });
  });

  return logoutAccount
    .then((response) => ({type: LOGOUT_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}

export function registerAccountService (payload) {

  const registerAccount = new Promise(function(resolve, reject) {
    // app.service("highscores")
    //   .find()
    //   .then((res) => {
    //     resolve({
    //       data: res.data,
    //       isFetched: true
    //     });
    //   })
    //   .catch((err) => {
    //     reject({
    //       message: err,
    //       hasError: true
    //     })
    //   });
  });

  return registerAccount
    .then((response) => ({type: REGISTER_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}

export function deleteAccountService (payload) {

  const deleteAccount = new Promise(function(resolve, reject) {
    // app.service("highscores")
    //   .find()
    //   .then((res) => {
    //     resolve({
    //       data: res.data,
    //       isFetched: true
    //     });
    //   })
    //   .catch((err) => {
    //     reject({
    //       message: err,
    //       hasError: true
    //     })
    //   });
  });

  return deleteAccount
    .then((response) => ({type: DELETE_ACCOUNT_SUCCESS, payload: response }))
    .catch((error) => ({type: RESPONSE_FAILURE, payload: error}))
}