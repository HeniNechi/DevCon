import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile,deleteAccount } from "../../actions/profileAction";
import Spinner from "../../components/common/spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(){
    this.props.deleteAccount()
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
            <p className="lead text-muted">
              Welcome{" "}
              <Link to={`/profile.${profile.handle}`}>
                {user.firstName} {user.lastName}
              </Link>
            </p>
            <ProfileActions />
            {/* TODO: exp and edu */}
            <div style={{marginBottom:'60px'}} />
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete My Account</button>
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
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-d">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentProfile ,
  deleteAccount}
)(Dashboard);
