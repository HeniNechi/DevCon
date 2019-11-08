import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import Spinner from "../../components/common/spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
import Experience from './Experience'
import Education from './Education'
import isEmpty from "../../validation/is_empty";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick() {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <div className="text-center">
            <img
                  className="rounded-circle "
                  src={user.avatar}
                  alt={user.firstname}
                  style={{ width: "120px", marginRight: "5px" }}
                  title="You must have a Gravatar connected to your email to display an image"
                />
                </div>
            <p className="lead text-muted text-center">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`}>
                {user.firstName} {user.lastName}{" "}
                
              </Link>
              
            </p>
            <ProfileActions />
            <h4 className="mb-4 mt-4"> Experience </h4>
            {isEmpty(profile.experience) ? (<div className="lead text-muted"> You didn't add any experience yet</div>) : (<Experience experience={profile.experience}/>) }
            <h4 className="mb-4 mt-4"> Education </h4>
            {isEmpty(profile.education) ? (<div className="lead text-muted"> You didn't add any education yet</div>) : (<Education education={profile.education}/>) }
            <div style={{ marginBottom: "60px" ,}} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              {" "}
              Delete My Account
            </button>
          </div>
        );
      } else {
        //user logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome {user.firstName} {user.lastName}
            </p>
            <p>
              You have not yet set your profile , pleasse add some informations
            </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Dashboard</h1>
              <div
                className="card"
                style={{
                  boxShadow:
                    "0 4px 8px 0 rgba(121, 69, 69, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  padding: "20px",
                }}
              >
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
