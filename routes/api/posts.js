const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation
const validatePostInput = require("../../validation/post");

//Load Model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile")



// @route  GET api/posts
// @desc   Fetch posts
// @access Private
router.get('/',passport.authenticate("jwt",{session:false}), (req, res) => {
    const errors = {};
  
    Post.find()
      .sort({date : -1})
      .then(posts => {
        if (!posts) {
          errors.posts = 'There are no posts';
          return res.status(404).json(errors);
        }
  
        res.json(posts);
      })
      .catch(err => res.status(404).json({ posts: 'There are no posts' }));
  });

// @route  GET api/posts/:id
// @desc   Fetch a single post 
// @access Private
router.get('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ post: "No Post found with /the id you entered " })
    );
})


// @route   DELETE api/posts/:id
  // @desc    Delete post
  // @access  Private
  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then( profile => {
          // Get remove index
         Post.findById(req.params.id)
         .then(post => {
             if(post.user.toString() !== req.user.id){
                 return res.status(401).json({ notautherised:'you are not the owner of the comment'})
             }
             //Delete 
             post.remove().then(()=>res.json({sucess:true}))
         })
  
        
    })
    .catch(err => res.status(404).json({postsnotfound:'No post Found'}))
})

// @route   POST api/posts/like/:id
  // @desc    Like post
  // @access  Private
  router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then( profile => {
          // Get remove index
         Post.findById(req.params.id)
         .then(post => {
            if(post.likes.filter(like=> like.user.toString()===req.user.id ).length > 0){
                    return res.status(400).json({ alreadyliked : 'User already liked this post'})
            }
            //Add the user id to the likes array 
            post.likes.unshift({user: req.user.id})
            post.save().then(post =>res.json(post))

         })
         .catch(err => res.status(404).json({postsnotfound:'No post Found'}))
        
    })
    .catch(err => res.status(404).json({postsnotfound:'No post Found'}))
})

// @route   POST api/posts/unlike/:id
  // @desc    unlike post
  // @access  Private
  router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then( profile => {
          // Get remove index
         Post.findById(req.params.id)
         .then(post => {
            if(post.likes.filter(like => like.user.toString()===req.user.id ).length === 0){
                    return res.status(400).json({ notalreadyliked : 'U have not yet liked this post'})
            }
            //remove Index
            const removeIndex = posts.likes
            .map(item => item.user.toString()).indexOf(req.user.id)

            post.likes.splice(removeIndex,1)
            post.save().then(post =>res.json(post))

         })
         .catch(err => res.status(404).json({postsnotfound:'No post Found'}))
        
    })
    .catch(err => res.status(404).json({postsnotfound:'No post Found'}))
})

// @route  POST api/posts
// @desc   Create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
