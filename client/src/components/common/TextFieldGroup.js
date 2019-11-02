import React from 'react'
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
<div className="form-group">
                  <input
                    type={type}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": error
                    })}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange}
                    disabled={disabled}
                  />
                  {info && <small className='form-text text-muted'></small>}
                  {error&& (
                    <div className="invalid-feedback">{error}</div>
                  )}
                </div>
    )
}
TextFieldGroup.prototypes = {
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    disabled:PropTypes.string
}
TextFieldGroup.defaultProps = {
    type:'text'
}

export default TextFieldGroup
