const express = require('express');

const postController = require('../controllers/post-controller');
const {
  validateCreatePost
} = require('../middlewares/validator/validate-post');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post(
  '/',
  upload.single('image'),
  validateCreatePost,
  postController.createPost
);

module.exports = router;
