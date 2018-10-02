async function pagination(model, req) {
  let limit = Number(req.params.limit); // number of records per page
  limit = limit > 50 ? 10 : limit;
  let offset = 0;
  const { count } = await model.findAndCountAll();
  let page = Number(req.params.page);
  const error = {
    message: '',
    status: '',
  };
  if (!page || !limit) {
    error.message = 'invalid limit or page Number';
    error.status = 400;
    page = 1;
  }
  const pages = Math.ceil(Number(count) / limit);
  offset = limit * (Number(page) - 1);
  const modelToPaginate = await model.findAll({
    limit,
    offset,
  });
  const paginated = {
    result: modelToPaginate,
    count,
    pages,
  };
  return { paginated, error };
}

module.exports = {
  pagination,
};
