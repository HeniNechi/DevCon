import { GET_ERRORS,SET_CURRENT_USER } from "./types";
import axios from "axios";

import jwt_decode from "jwt-decode"
import setAuthToken from "../utils/setAuthToken";

// Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Login User -token

export const loginUser = userData => dispatch => {
    axios
    .post("/api/users/login", userData)
    .then(res => {
        // save to local storage
        const {token} = res.data
        // set token to localstorage
        localStorage.setItem('jwtToken',token) 
        //set token to auth header
        setAuthToken(token)
        // decode token
        const decoded = jwt_decode(token)
        //set current user
        dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type:SET_CURRENT_USER,
        payload:decoded
    }
}
// Log user out
export const logoutUser = () => dispatch => {
    //remove token from local storage 
    localStorage.removeItem('jwtToken')
    //remove auth header for future request
    setAuthToken(false)
    //set current user to empty object and isAuthticated to false
    dispatch(setCurrentUser({}))
}