const router = require('express-promise-router')();

const { create } = require('../controllers/orderController');

router.post('/', create);

module.exports = router;
