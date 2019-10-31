const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

 
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";
  data.status = !isEmpty(data.status) ? data.status : "";
 

  
  
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 6 and 40 characters";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Status is required";
  }
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
        errors.website = "Not a valid Url";
      }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
        errors.facebook = "Not a valid Url";
      }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
        errors.twitter = "Not a valid Url";
      }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
        errors.instagram = "Not a valid Url";
      }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
        errors.linkedin = "Not a valid Url";
      }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
        errors.youtube = "Not a valid Url";
      }
  }
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
