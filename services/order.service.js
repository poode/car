const {
  orders,
} = require('../config/db').db;
const { validate } = require('../util/helpers/validation');
const orderSchema = require('../api/v1/schema/orderSchema.json');

async function setOrder(req, res) {
  const results = {
    error: '',
    orderFound: '',
  };
  const errors = validate(orderSchema, req.body);
  if (errors.length) {
    results.error = { message: errors, status: 400 };
    return results;
  }
  const { carTypeId, serviceTypeId, location } = req.body;

  const findPreviousOrder = await orders.findOne({
    where: { userId: res.locals.userId },
    order: [['id', 'DESC']],
  });


  if (findPreviousOrder) {
    const orderDay = Number(JSON.stringify(new Date(`${findPreviousOrder.startTime}UTC`)).split('-')[2].split('T')[0]);
    const today = new Date().getDate();
    if (orderDay === today) {
      results.error = { message: 'You asked today for a service. Ask again tomorrow', status: 412 };
      return results;
    }
  }

  const options = {
    userId: Number(res.locals.userId),
    carTypeId: Number(carTypeId),
    serviceTypeId: Number(serviceTypeId),
    location,
  };

  const order = await orders.create(options);

  results.orderFound = order;
  return results;
}

async function getAllOrders() {
  const orderList = await orders.findAll();
  const orderListWithRightTimeZone = orderList.map()
  return orderList;
}

module.exports = {
  setOrder,
  getAllOrders,
};
