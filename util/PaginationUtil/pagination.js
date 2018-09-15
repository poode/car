const paginate = require('express-paginate');

async function pagination(model, req) {
  const results = await model.findAndCountAll({
    limit: req.query.limit,
    offset: req.skip,
  });
  const itemCount = results.count;
  const pageCount = Math.ceil(itemCount / req.query.limit);
  return {
    object: 'list',
    has_more: paginate.hasNextPages(req)(pageCount),
    data: results.rows,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
  };
}

module.exports = {
  pagination,
};
