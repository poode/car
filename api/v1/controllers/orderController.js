const { setOrder } = require('../../../services/order.service');

async function create(req, res, next) {
  const { orderFound, error } = await setOrder(req, res);
  return res.json(orderFound);
}

module.exports = {
  create,
};
