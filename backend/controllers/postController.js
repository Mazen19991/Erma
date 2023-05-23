const Post = require('../models/postModel');
const User = require('../models/userModel');
const Tags = require('../models/tagsModel');
const catchAsync = require('../middlewares/catchAsync');
const ErrorHandler = require('../utils/errorHandler');
const { TYPES } = require('../../public/constants');
const ObjectId = require('mongoose').Types.ObjectId;
const uploadToS3 = require('../utils/uploadToS3');

// Create New Post
exports.newPost = catchAsync(async (req, res, next) => {
  const postData = {
    caption: req.body.caption,
    image: req?.file?.filename,
    postedBy: req.user._id,
  };
  let tags;
  if (req.body?.tags?.length > 0) {
    tags = await Tags.find({ _id: { $in: req.body.tags } });
  }
  if (req.body?.tags && tags.length !== req.body?.tags?.length) {
    return next(new ErrorHandler('Tag not found', 404));
  }
  if (tags?.length > 0) {
    postData.tags = tags.map((tag) => tag._id);
  }
  let directory = {};
  if (req?.file?.fieldname) {
    directory = await uploadToS3(TYPES.POSTS, req.file);
  }
  const post = await Post.create({
    ...postData,
    image: directory
      ? `https://erma.s3.amazonaws.com/posts/${directory}`
      : null,
  });

  const user = await User.findById(req.user._id);
  user.posts.push(post._id);
  await user.save();

  return res.status(201).json({
    success: true,
    post,
  });
});

// Like or Unlike Post
exports.likeUnlikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler('Post Not Found', 404));
  }

  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);

    post.likes.splice(index, 1);
    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Post Unliked',
    });
  } else {
    post.likes.push(req.user._id);

    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Post Liked',
    });
  }
});

// Delete Post
exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler('Post Not Found', 404));
  }

  if (post.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler('Unauthorized', 401));
  }

  await deleteFile('posts/', post.image);

  await post.remove();

  const user = await User.findById(req.user._id);

  const index = user.posts.indexOf(req.params.id);
  user.posts.splice(index, 1);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Post Deleted',
  });
});

// Update Caption
exports.updateCaption = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler('Post Not Found', 404));
  }

  if (post.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler('Unauthorized', 401));
  }

  post.caption = req.body.caption;

  await post.save();

  res.status(200).json({
    success: true,
    message: 'Post Updated',
  });
});

// Add Comment
exports.newComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler('Post Not Found', 404));
  }

  if (post.comments.includes(req.user._id)) {
    return next(new ErrorHandler('Already Commented', 500));
  }

  post.comments.push({
    user: req.user._id,
    comment: req.body.comment,
  });

  await post.save();

  return res.status(200).json({
    success: true,
    message: 'Comment Added',
  });
});

// Posts of Following
exports.getPostsOfFollowing = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const currentPage = Number(req.query.page) || 1;

  const skipPosts = 4 * (currentPage - 1);

  const totalPosts = await Post.find({
    postedBy: {
      $in: user.following,
    },
  }).countDocuments();

  const posts = await Post.find({
    postedBy: {
      $in: user.following,
    },
  })
    .populate('postedBy likes')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .sort({ $natural: -1 })
    .limit(4)
    .skip(skipPosts);

  const tags = await Tags.find();

  return res.status(200).json({
    success: true,
    posts: posts,
    totalPosts,
    tags: tags,
  });
});

// Save or Unsave Post
exports.saveUnsavePost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorHandler('Post Not Found', 404));
  }

  if (user.saved.includes(post._id.toString())) {
    user.saved = user.saved.filter((p) => p.toString() !== post._id.toString());
    post.savedBy = post.savedBy.filter(
      (p) => p.toString() !== req.user._id.toString()
    );
    await user.save();
    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Post Unsaved',
    });
  } else {
    user.saved.push(post._id);
    post.savedBy.push(req.user._id);

    await user.save();
    await post.save();

    return res.status(200).json({
      success: true,
      message: 'Post Saved',
    });
  }
});

// Get Post Details
exports.getPostDetails = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('postedBy likes')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    });

  if (!post) {
    return next(new ErrorHandler('Post Not Found', 404));
  }

  res.status(200).json({
    success: true,
    post,
  });
});

// Get All Posts
exports.allPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  return res.status(200).json({
    posts,
  });
});

// Filter Posts By Tags ( 1 or many )
exports.filterPostsByTags = catchAsync(async (req, res, next) => {
  if (!req.body.tagIds) {
    return next(new ErrorHandler('Please Provide Tag Ids', 400));
  }
  if (!Array.isArray(req.body.tagIds)) {
    return next(new ErrorHandler('Please Provide Tag Ids in Array', 400));
  }
  if (req.body.tagIds.every((id) => !ObjectId.isValid(id))) {
    return next(new ErrorHandler('Please Provide Valid Tag Ids', 400));
  }
  let tagQuery =
    req.body?.tagIds?.length > 0 ? req.body.tagIds : { $exists: true };
  if (Array.isArray(tagQuery)) {
    tagQuery = tagQuery.map((id) => new ObjectId(id));
  }

  const allFilteredPosts = await Post.aggregate([
    {
      $match: {
        tags: {
          $all: tagQuery,
        },
      },
    },
    {
      $lookup: {
        from: 'tags',
        localField: 'tags',
        foreignField: '_id',
        as: 'allTags',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'postedBy',
        foreignField: '_id',
        as: 'OwnerOfPost',
      },
    },
    {
      $match: {
        'OwnerOfPost.followers': {
          $in: [req.user._id],
        },
      },
    },
    {
      $project: {
        tags: 0,
      },
    },
  ]);
  if (!allFilteredPosts) {
    return next(new ErrorHandler('No Posts Found', 404));
  }
  const newReturnObj = allFilteredPosts.map((post) => {
    return { ...post, postedBy: post?.OwnerOfPost[0] };
  });

  return res.status(200).json({
    success: true,
    posts: newReturnObj,
  });
});
