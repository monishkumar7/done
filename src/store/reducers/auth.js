import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  loggedIn: false,
  idToken: null,
  refreshToken: null,
  expiresIn: null,
  errorMsg: null,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      let updatedSuccessState = {
        ...state,
        loggedIn: true,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expiresIn: action.expiresIn,
        errorMsg: null,
        authRedirectPath: "/todos"
      };
      return updatedSuccessState;

    case actionTypes.AUTH_FAIL:
      let updatedFailState = {
        ...state,
        loggedIn: false,
        errorMsg: action.errorMsg,
        idToken: null,
        refreshToken: null,
        expiresIn: null,
        authRedirectPath: "/"
      };
      return updatedFailState;

    case actionTypes.AUTH_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
