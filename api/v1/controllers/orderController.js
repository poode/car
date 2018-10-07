const { setOrder } = require('../../../services/order.service');

async function create(req, res, next) {
  const { orderFound, error } = await setOrder(req, res);
  if (error) return next(error);
  return res.json(orderFound);
}

module.exports = {
  create,
};
