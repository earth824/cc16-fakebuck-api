const catchError = require('../utils/catch-error');
const createError = require('../utils/create-error');
const userService = require('../services/user-service');
const hashService = require('../services/hash-service');
const jwtService = require('../services/jwt-service');

exports.register = catchError(async (req, res, next) => {
  const existsUser = await userService.findUserByEmailOrMobile(
    req.body.email || req.body.mobile
  );

  if (existsUser) {
    createError('email address or mobile number already in use', 400);
  }

  req.body.password = await hashService.hash(req.body.password);

  const newUser = await userService.createUser(req.body);
  const payload = { userId: newUser.id };
  const accessToken = jwtService.sign(payload);

  res.status(201).json({ accessToken });
});
