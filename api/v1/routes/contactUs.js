const router = require('express-promise-router')();
const { upload } = require('../../../middleware/upload');

const { index, postContactUs, contactUsLimited } = require('../controllers/contactUsController');

router.post('/', upload, postContactUs);

router.get('/', index);

router.get('/limit/:limit/page/:page', contactUsLimited);


module.exports = router;
