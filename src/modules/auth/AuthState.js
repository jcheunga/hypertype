import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import * as ErrorState from '../../modules/error/ErrorState';
import { loginAccountService, logoutAccountService, registerAccountService, deleteAccountService } from '../../services/authService';

// Initial state
const initialState = {
  user: null,
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  isLoggedOut: false,
  isRegistering: false,
  isRegisterd: false,
  hasError: false
};

// Actions
const LOGIN_ACCOUNT = 'AuthState/LOGIN_ACCOUNT';
export const LOGIN_ACCOUNT_SUCCESS = 'AuthState/LOGIN_ACCOUNT_SUCCESS';

const LOGOUT_ACCOUNT = 'AuthState/LOGOUT_ACCOUNT';
export const LOGOUT_ACCOUNT_SUCCESS = 'AuthState/LOGOUT_ACCOUNT_SUCCESS';

const REGISTER_ACCOUNT = 'AuthState/REGISTER_ACCOUNT';
export const REGISTER_ACCOUNT_SUCCESS = 'AuthState/REGISTER_ACCOUNT_SUCCESS';

const DELETE_ACCOUNT = 'AuthState/DELETE_ACCOUNT';
export const DELETE_ACCOUNT_SUCCESS = 'AuthState/DELETE_ACCOUNT_SUCCESS';

export const RESPONSE_FAILURE = 'AuthState/RESPONSE_FAILURE';

// Action creators
export function loginAccount (userData) {
  return {
    type: LOGIN_ACCOUNT,
    payload: {userData: userData}
  };
}

export function logoutAccount () {
  return {
    type: LOGOUT_ACCOUNT
  };
}

export function registerAccount (userData) {
  return {
    type: REGISTER_ACCOUNT,
    payload: {userData: userData}
  };
}

export function deleteAccount () {
  return {
    type: DELETE_ACCOUNT
  };
}

// Reducer
export default function AuthStateReducer(state = initialState, action = {}) {

  switch (action.type) {
    case LOGIN_ACCOUNT:
      return loop(
        {
          ...state,
          isLoggingIn: true,
          isLoggedIn: false,
        },
        Effects.promise(loginAccountService, action.payload)
      );

    case LOGIN_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      };

    case LOGOUT_ACCOUNT:
      return loop(
        {
          ...state,
          isLoggingIn: true,
          isLoggedIn: false,
        },
        Effects.promise(loginAccountService, action.payload)
      );

    case LOGOUT_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      };

    case REGISTER_ACCOUNT:
      return loop(
        {
          ...state,
          isLoggingIn: true,
          isLoggedIn: false,
        },
        Effects.promise(loginAccountService, action.payload)
      );

    case REGISTER_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      };

    case DELETE_ACCOUNT:
      return loop(
        {
          ...state,
          isLoggingIn: true,
          isLoggedIn: false,
        },
        Effects.promise(loginAccountService, action.payload)
      );

    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user
      };

    case RESPONSE_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        isLoggingOut: false,
        isLoggedOut: false,
        isRegistering: false,
        isRegisterd: false,
        hasError: true
      };

    default:
      return state;
  }
}