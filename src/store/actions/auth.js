import axios from "axios";

import * as actionTypes from "./actionTypes";
import { firebaseAPIKey } from "../../keys";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const postData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let postUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      firebaseAPIKey;
    if (isSignup)
      postUrl =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        firebaseAPIKey;
    axios
      .post(postUrl, postData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.refreshToken,
            response.data.expiresIn,
            response.data.localId
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const authSuccess = (idToken, refreshToken, expiresIn, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    refreshToken: refreshToken,
    expiresIn: expiresIn,
    userId: userId
  };
};

export const authFail = errorMsg => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMsg: errorMsg
  };
};

export const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationDate => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const idToken = localStorage.getItem("idToken");
    if (idToken !== null) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const refreshToken = localStorage.getItem("refreshToken");
        const userId = localStorage.getItem("userId");
        const expiresIn = localStorage.getItem("expiresIn");
        dispatch(authSuccess(idToken, refreshToken, expiresIn, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};

export const authSetRedirectPath = path => {
  return {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path: path
  };
};
