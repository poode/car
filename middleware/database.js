const databaseMiddleware = db => async (req, res, next) => {
  try {
    const connection = await db;
    res.locals.dbConn = connection;
    return next();
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  databaseMiddleware,
};
