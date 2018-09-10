const { authentication } = require('../../../services/login.service');

function index(req, res, next) {
  authentication(req, res, next);
}

module.exports = {
  index,
};
