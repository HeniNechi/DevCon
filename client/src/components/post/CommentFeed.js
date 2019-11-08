import React, { Component } from 'react'
import PropTypes from "prop-types";
import CommentItem from './CommentItem';

class CommentFeed extends Component {
    render() {
        const {comments,PostCommentId}=this.props;
        return comments.map(comment => <CommentItem key={comment._id} comment={comment} PostCommentId={PostCommentId} />)
    }
}
CommentFeed.propTypes = {
    comments:PropTypes.array.isRequired,
    PostCommentId:PropTypes.string.isRequired
}
export default  CommentFeed