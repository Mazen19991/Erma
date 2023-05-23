const express = require('express');
const {
  newPost,
  likeUnlikePost,
  deletePost,
  newComment,
  allPosts,
  getPostsOfFollowing,
  updateCaption,
  saveUnsavePost,
  getPostDetails,
  filterPostsByTags,
} = require('../controllers/postController');
const { isAuthenticated } = require('../middlewares/auth');
const path = require('path');
const multer = require('multer');

const router = express();

const postUpload = multer({
  limit: { fileSize: 1000000 * 10 },
});

router
  .route('/post/new')
  .post(isAuthenticated, postUpload.single('posts'), newPost);
router.route('/post/tags').post(isAuthenticated, filterPostsByTags);
router.route('/posts/all').get(allPosts);
router.route('/posts').get(isAuthenticated, getPostsOfFollowing);
router.route('/post/detail/:id').get(isAuthenticated, getPostDetails);
router.route('/post/:id').get(isAuthenticated, likeUnlikePost);
router.route('/post/:id').post(isAuthenticated, saveUnsavePost);
router.route('/post/:id').put(isAuthenticated, updateCaption);
router.route('/post/:id').delete(isAuthenticated, deletePost);
router.route('/post/comment/:id').post(isAuthenticated, newComment);

module.exports = router;
