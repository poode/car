const router = require('express-promise-router')();

const { create, index } = require('../controllers/orderController');

router.post('/', create);
router.get('/', index);

module.exports = router;
