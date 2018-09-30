const router = require('express-promise-router')();

const { index, postContactUs } = require('../controllers/contactUsController');

router.post('/', postContactUs);

router.get('/', index);


module.exports = router;
