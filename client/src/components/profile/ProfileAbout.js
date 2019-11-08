import React, { Component } from "react";
import isEmpty from "../../validation/is_empty";

class ProfileCreds extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {profile.user.firstName}'s Bio
            </h3>
            {isEmpty(profile.bio) ? (<div className="text-center card card-body "><div className="text-danger">User didn't add a bio</div></div>) : <p className="lead">{profile.bio}</p>}
          <br/>
          <br/>

            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center card card-body">
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <div className="p-3" key={index}>
                    <i className="fa fa-check"></i>
                    {" "}{skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileCreds;
