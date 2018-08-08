import axios from "axios";

import * as actionTypes from "./actionTypes";

const appKey = "AIzaSyAgpXZ50ti4iw1nO-KfNVYCjPJ7nNkESsg";

export const authStart = (email, password, isSignup) => {
  return dispatch => {
    const postData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let postUrl =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      appKey;
    if (isSignup)
      postUrl =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        appKey;
    axios
      .post(postUrl, postData)
      .then(response => {
        console.log(response);
        // dispatch(signUpSuccess());
      })
      .catch(error => {
        console.log(error);
        // dispatch(signUpFail());
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
