const express = require('express');
const upload = require('../middlewares/upload');

const userController = require('../controllers/user-controller');
const {
  validateTargetUserId
} = require('../middlewares/validator/validate-user');

const router = express.Router();

router.patch(
  '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  userController.updateUser
);

router.get(
  '/:targetUserId/profile',
  validateTargetUserId,
  userController.checkExistUser,
  userController.getUserProfileByTargetUserId
);

module.exports = router;
