const router = require('express-promise-router')();

const { index } = require('../controllers/LoginController');

router.post('/', index);

module.exports = router;
