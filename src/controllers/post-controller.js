const catchError = require('../utils/catch-error');
const uploadService = require('../services/upload-service');
const postService = require('../services/post-service');

exports.createPost = catchError(async (req, res, next) => {
  const data = { userId: req.user.id, title: req.body.title };
  if (req.file) {
    data.image = await uploadService.upload(req.file.path);
  }
  const post = await postService.createPost(data);
  res.status(201).json({ post });
});

exports.getAllPostIncludeFriendPost = catchError(async (req, res, next) => {
  const posts = await postService.findPostIncludeFriendPostByUserId(
    req.user.id
  );
  res.status(200).json({ posts });
});
