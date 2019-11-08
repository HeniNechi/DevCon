import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import Spinner from '../common/spinner';
import { getPost } from '../../actions/postAction';
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
class PostId extends Component {
    componentDidMount() {
        this.props.getPost(this.props.match.params.id)
    }
    render() {
        const {post,loading} =this.props.post;
        let PostContent 
        if(post === null || loading || Object.keys(post).length === 0) { 
            PostContent = <Spinner />
        } else { 
            PostContent = (
                <div>
                    <PostItem post={post} showActions={false}/>
                    <CommentForm PostCommentId={post._id}/>
                    <CommentFeed comments={post.comments} PostCommentId={post._id}/>
                </div>
            )
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row"> 
                    <div className="col-md-12">
                        <Link to="/feed" className="btn btn-dark mb-3">
                            Back to Feed
                        </Link>
                        {PostContent}
                    </div>
                    </div>

                </div>
            </div>
        )
    }
}
PostId.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    post:state.post
})
export default  connect(mapStateToProps,{getPost})(PostId)