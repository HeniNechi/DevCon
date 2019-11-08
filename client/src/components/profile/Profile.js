import React, { Component } from "react";
import ProfileHeader from "./profileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileAbout from "./ProfileAbout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner";
import { getProfileByHandle } from "../../actions/profileAction";
import { Link } from "react-router-dom";
class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
UNSAFE_componentWillReceiveProps(nextProps){
  if(nextProps.profile.profile === null && this.props.profile.loading){
    this.props.history.push('/not-found')
  }
}
  render() {
    const { profile, loading } = this.props.profile;
    
    let profileContent;
    if (profile === null || loading ) {
      profileContent = (<Spinner />);
    } else { profileContent = 
         (
        <div>
          <ProfileHeader profile={profile}/>
          <ProfileAbout profile ={profile}/>
          <ProfileCreds education={profile.education} experience={profile.experience}/>
          {profile.githubUsername&&profile.githubUsername!=' ' ? (<ProfileGithub username={profile.githubUsername} />) : (<div className="text-center card card-body "><div className="text-danger">User didn't add a github account</div></div>)}
          
        </div>
      );
   
}
    return (<div className="profile mb-5 ">
    <div className="container">
      <div className="row">
      <Link to="/profiles" className="btn btn-dark mr-auto ml-3 mt-1">
                Developers 
              </Link>
        <div className="col-md-12">
          <h1 className="display-4 text-center ">Profile</h1>
         
          <div className="section add-experience card p-3" style={{boxShadow: "0 4px 8px 0 rgba(121, 69, 69, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",paddingBottom:"20px"}}>

            {profileContent}
          </div>
        </div>
      </div>
    </div>
  </div>)
  }
}
Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile
  });
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
