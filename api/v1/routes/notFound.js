module.exports = (req, res, next) => {
  const error = { message: 'I don\'t blame you.It is my mistake, or may be you\'re calling a wrong endpoint', status: 404 };
  next(error);
};
