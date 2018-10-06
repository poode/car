const router = require('express-promise-router')();

const { index, forgotPassword, resetPassword } = require('../controllers/LoginController');

router.post('/', index);
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

module.exports = router;
