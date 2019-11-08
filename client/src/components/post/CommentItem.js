import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postAction";

class CommentItem extends Component {
    onDeleteClick(PostCommentId,CommentId){
        this.props.deleteComment(PostCommentId,CommentId)
    }
    render() {
        const {comment,PostCommentId ,auth}=this.props;
        return (
            <div class="card card-body mb-3">
              <div class="row">
              
                <div class="col-md-2 col-4 mr-2 col-lg-2">
                  <a href="profile.html">
                    <div className="text-center">
                    <img class="rounded-circle" src={comment.avatar} alt="" style={{ width: "76px", marginRight: "5px" }} />
                    </div>
                  </a>
                  <br />
                  <p class="text-center">{comment.firstName} {comment.lastName}</p>
                </div>
                <div class="col-md-8 col-5 col-lg-8">
                  <p class="lead">{comment.text}</p>
                  
                </div>
                <div className="col-md-2 col-1 col-lg-1 ml-3">{comment.user === auth.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={this.onDeleteClick.bind(this, PostCommentId,comment._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}</div>
                
              </div>
        </div> )
    }
}
CommentItem.propTypes = { 
    deleteComment:PropTypes.func.isRequired,
    comment:PropTypes.object.isRequired,
    PostCommentId:PropTypes.string.isRequired,
    auth:PropTypes.object.isRequired
}
const mapStateToProps = state => ({ 
    auth:state.auth
})
export default connect(mapStateToProps,{deleteComment})(CommentItem)