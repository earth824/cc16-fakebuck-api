const express = require('express');
const upload = require('../middlewares/upload');

const userController = require('../controllers/user-controller');

const router = express.Router();

router.patch(
  '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  userController.updateUser
);

module.exports = router;
