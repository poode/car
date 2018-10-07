const {
  orders,
} = require('../config/db').db;

const { findOrCreate } = require('../util/helpers/ormFunctions');

async function setOrder(req, res) {
  const results = {
    error: '',
    orderFound: '',
  };
  const { carTypeId, serviceTypeId, location } = req.body;

  const options = {
    where: { },
    default: {
      userId: res.locals.userId,
      carTypeId,
      serviceTypeId,
      location,
    },
  };
  const { modelInstance, modelExists } = await findOrCreate(orders, options);

  if (modelExists === false) {
    results.error = { message: 'Order already requested!', status: 409 };
    return results;
  }

  results.orderFound = modelInstance;
  return results;
}

module.exports = {
  setOrder,
};
