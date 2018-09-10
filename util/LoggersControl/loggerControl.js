module.exports = function loggerControl() {
  let env = false;
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    env = true;
    return env;
    /* eslint-disable */
  } else {
    return env;
  }
  /* eslint-enable */
};
