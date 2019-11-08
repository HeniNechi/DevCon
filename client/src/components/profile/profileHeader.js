import React, { Component } from "react";
import isEmpty from "../../validation/is_empty";
class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row"> 
            
              <div className="col-7 col-md-2  col-lg-2 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt={profile.user.firstName}
                  style={{ width: "130px", marginRight: "5px" }}
                  title="You must have a Gravatar connected to your email to display an image"
                />{" "}
                
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">
                {profile.user.firstName} {profile.user.lastName}
              </h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {isEmpty(profile.location) ? null : (
                  <p>{profile.location}</p>
                )}
              <p>{isEmpty(profile.website) ? null : (
                  <a className="text-white p-2" href={profile.website} target ="_blank" >
                  <i className="social fas fa-globe fa-2x"></i>
                </a>
                )}
                {isEmpty(profile.social) ? null : (
                    isEmpty(profile.social.twitter) ? null : (
                        <a className=" text-white p-2" href={profile.social.twitter} target ="_blank">
                        <i className="social fab fa-twitter fa-2x"></i>
                      </a>
                ))}
                {isEmpty(profile.social) ? null : (
                    isEmpty(profile.social.facebook) ? null : (
                        <a className="text-white p-2" href={profile.social.facebook} target ="_blank">
                        <i className="social fab fa-facebook fa-2x"></i>
                      </a>
                     ))}
                     {isEmpty(profile.social) ? null : (
                     isEmpty(profile.social.linkedin) ? null : (
                         <a className="text-white p-2" href={profile.social.linkedin} target ="_blank">
                       <i className="social fab fa-linkedin fa-2x"></i>
                     </a>
                      ))}
                      {isEmpty(profile.social) ? null : (
                     isEmpty(profile.social.instagram) ? null : (
                         <a className="text-white p-2" href={profile.social.instagram} target ="_blank">
                         <i className="social fab fa-instagram fa-2x"></i>
                       </a>
                     ))}
                     {isEmpty(profile.social) ? null : (
                     isEmpty(profile.social.youtube) ? null : (
                         <a className="text-white p-2" href={profile.social.youtube} target ="_blank">
                         <i className="social fab fa-youtube fa-2x"></i>
                       </a>
                      ))}


                
               
                
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
