const catchError = require('../utils/catch-error');

exports.register = catchError(async (req, res, next) => {
  throw new Error('Test catch error function');
});
