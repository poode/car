const router = require('express-promise-router')();

const { index, forgotPassword } = require('../controllers/LoginController');

router.post('/', index);
router.post('/forgot', forgotPassword);

module.exports = router;
