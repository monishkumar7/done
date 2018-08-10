import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../utility";

const initialState = {
  userId: null,
  loggedIn: false,
  idToken: null,
  refreshToken: null,
  expiresIn: null,
  errorMsg: null,
  authRedirectPath: "/",
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loggedIn: true,
    idToken: action.idToken,
    refreshToken: action.refreshToken,
    expiresIn: action.expiresIn,
    userId: action.userId,
    errorMsg: null,
    authRedirectPath: "/todos",
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loggedIn: false,
    errorMsg: action.errorMsg,
    idToken: null,
    refreshToken: null,
    userId: null,
    expiresIn: null,
    authRedirectPath: "/",
    loading: false
  });
};

const authSetRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SET_REDIRECT_PATH:
      return authSetRedirectPath(state, action);
    case actionTypes.AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
