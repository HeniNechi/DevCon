import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/spinner";
import { getProfiles } from "../../actions/profileAction";
import ProfileItem from "./ProfileItem";
import {Link } from 'react-router-dom'
class Porfiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (<ProfileItem key={profile._id} profile={profile}/>))
      } else {
        profileItems = <h4>No Profiles Yet ...</h4>;
      }
    }

    return (
      <div className="Profiles card  mb-5 pt-3" style={{
        boxShadow:
          "0 4px 8px 0 rgba(121, 69, 69, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        padding: "20px",
      }}>
          <Link to="dashboard" className="btn btn-dark mr-auto ml-1 mt-1">
                Go Back
              </Link>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center"> Developers Profiles </h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Porfiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Porfiles);
