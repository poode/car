function verificationMiddleware(req, res, next) {
  const { verified } = res.locals;
  if (!verified) {
    return next({ message: `Your Mobile Number ${res.locals.userMobile} is not verified yet, please Verify it with an SMS Number`, status: 403 });
  }
  return next();
}

module.exports = {
  verificationMiddleware,
};
