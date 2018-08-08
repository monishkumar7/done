import axios from "axios";

import * as actionTypes from "./actionTypes";
import { firebaseAPIKey } from "../../keys";

export const authStart = (email, password, isSignup) => {
  return dispatch => {
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
        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.refreshToken,
            response.data.expiresIn
          )
        );
      })
      .catch(error => {
        dispatch(authFail(error.message));
      });
  };
};

export const authSuccess = (idToken, refreshToken, expiresIn) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    refreshToken: refreshToken,
    expiresIn: expiresIn
  };
};

export const authFail = errorMsg => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMsg: errorMsg
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
