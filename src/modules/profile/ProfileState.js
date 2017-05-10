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
const LOGIN_ACCOUNT = 'ProfileState/LOGIN_ACCOUNT';
export const LOGIN_ACCOUNT_SUCCESS = 'ProfileState/LOGIN_ACCOUNT_SUCCESS';

const LOGOUT_ACCOUNT = 'ProfileState/LOGOUT_ACCOUNT';
export const LOGOUT_ACCOUNT_SUCCESS = 'ProfileState/LOGOUT_ACCOUNT_SUCCESS';

const REGISTER_ACCOUNT = 'ProfileState/REGISTER_ACCOUNT';
export const REGISTER_ACCOUNT_SUCCESS = 'ProfileState/REGISTER_ACCOUNT_SUCCESS';

const DELETE_ACCOUNT = 'ProfileState/DELETE_ACCOUNT';
export const DELETE_ACCOUNT_SUCCESS = 'ProfileState/DELETE_ACCOUNT_SUCCESS';

export const RESPONSE_FAILURE = 'ProfileState/RESPONSE_FAILURE';

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
export default function ProfileStateReducer(state = initialState, action = {}) {

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