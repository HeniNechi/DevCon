import axios from "axios";

import {
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from "./types";

//GET CURRENT PROFILE
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//GET CURRENT PROFILE BY HANDLE
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
//Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
// Get profiles
export const getProfiles = () => dispatch => {
dispatch(setProfileLoading())
axios
.get('/api/profile/all')
.then(res => dispatch({
  type:GET_PROFILES,
  payload:res.data
}))
.catch(err =>
  dispatch({
    type: GET_PROFILES,
    payload: null
  })
);
}


//add experience
export const addExperience = (newExperience,history) => dispatch => {
  axios
  .post("/api/profile/experience",newExperience)
  .then(res => history.push("/dashboard"))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
//add education
export const addEducation = (newEducation,history) => dispatch => {
  axios
  .post("/api/profile/education",newEducation)
  .then(res => history.push("/dashboard"))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// delete experience 
export const deleteExperience = (id) => dispatch => {
  axios
  .delete(`/api/profile/experience/${id}`)
  .then(res => 
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    }))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// delete experience 
export const deleteEducation = (id) => dispatch => {
  axios
  .delete(`/api/profile/education/${id}`)
  .then(res => 
    dispatch({
      type:GET_PROFILE,
      payload:res.data
    }))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Delete Profile & user
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? this cannot be undone!")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
