const { setOrder, getAllOrders } = require('../../../services/order.service');

async function index(req, res, next) {
  const orderList = await getAllOrders();
  return res.json(orderList);
}

async function create(req, res, next) {
  const { orderFound, error } = await setOrder(req, res);
  if (error) return next(error);
  return res.json(orderFound);
}

module.exports = {
  create,
  index,
};
