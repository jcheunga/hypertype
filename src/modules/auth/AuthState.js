import {loop, Effects} from 'redux-loop-symbol-ponyfill';
import {NavigationActions} from 'react-navigation';
import * as ErrorState from '../../modules/error/ErrorState';
import { authenticateAccountService, logoutAccountService, registerAccountService, deleteAccountService } from '../../services/authService';

// Initial state
const initialState = {
  user: null,
  isLoggingOut: false,
  isLoggedOut: false,
  isRegistering: false,
  isRegisterd: false,
  isAuthenticating: false,
  isAuthenticated: false,
  hasError: false
};

// Actions
const AUTHENTICATE_ACCOUNT = 'AuthState/AUTHENTICATE_ACCOUNT';
export const AUTHENTICATE_ACCOUNT_SUCCESS = 'AuthState/AUTHENTICATE_ACCOUNT_SUCCESS';

const LOGOUT_ACCOUNT = 'AuthState/LOGOUT_ACCOUNT';
export const LOGOUT_ACCOUNT_SUCCESS = 'AuthState/LOGOUT_ACCOUNT_SUCCESS';

const REGISTER_ACCOUNT = 'AuthState/REGISTER_ACCOUNT';
export const REGISTER_ACCOUNT_SUCCESS = 'AuthState/REGISTER_ACCOUNT_SUCCESS';

const DELETE_ACCOUNT = 'AuthState/DELETE_ACCOUNT';
export const DELETE_ACCOUNT_SUCCESS = 'AuthState/DELETE_ACCOUNT_SUCCESS';

export const RESPONSE_FAILURE = 'AuthState/RESPONSE_FAILURE';

// Action creators
export function authenticateAccount (userData) {
  return {
    type: AUTHENTICATE_ACCOUNT,
    payload: userData
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
    payload: userData
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
    case AUTHENTICATE_ACCOUNT:
      return loop(
        {
          ...state,
          isAuthenticating: true,
          isAuthenticated: false,
        },
        Effects.promise(authenticateAccountService, action.payload)
      );

    case AUTHENTICATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
      };

    case LOGOUT_ACCOUNT:
      return loop(
        {
          ...state,
          isLoggingOut: true,
          isLoggedOut: false,
        },
        Effects.promise(logoutAccountService, action.payload)
      );

    case LOGOUT_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: null,
        isLoggingOut: false,
        isLoggedOut: action.payload.isLoggedOut,
        isRegistering: false,
        isRegisterd: false,
        isAuthenticating: false,
        isAuthenticated: false,
        hasError: false
      };

    case REGISTER_ACCOUNT:
      return loop(
        {
          ...state,
          isRegistering: true,
          isRegistered: false,
        },
        Effects.promise(registerAccountService, action.payload)
      );

    case REGISTER_ACCOUNT_SUCCESS:
      return loop(
        {
          ...state,
          isRegistering: false,
          isRegistered: action.payload.isRegistered
        },
        Effects.constant(authenticateAccount(action.payload.user))
      );

    case DELETE_ACCOUNT:
      return loop(
        {
          ...state,
          isDeleting: true,
          isDeleted: false,
        },
        Effects.promise(deleteAccountService, action.payload)
      );

    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        isDeleted: action.payload.isDeleted
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
        isAuthenticating: false,
        isAuthenticated: false,
        hasError: true
      };

    default:
      return state;
  }
}