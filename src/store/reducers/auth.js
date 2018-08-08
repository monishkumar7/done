import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: null,
  loggedIn: false,
  idToken: null,
  refreshToken: null,
  expiresIn: null,
  errorMsg: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      let updatedSuccessState = {
        ...state,
        loggedIn: true,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        expiresIn: action.expiresIn
      };
      return updatedSuccessState;
    case actionTypes.AUTH_FAIL:
      let updatedFailState = {
        ...state,
        loggedIn: false,
        errorMsg: action.errorMsg
      };
      return updatedFailState;
    default:
      return state;
  }
};

export default reducer;
