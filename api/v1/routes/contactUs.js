const router = require('express-promise-router')();
const { upload } = require('../../../middleware/upload');

const { index, uploadPhoto, contactUsLimited } = require('../controllers/contactUsController');

router.post('/', upload, uploadPhoto);

router.get('/', index);

router.get('/limit/:limit/page/:page', contactUsLimited);


module.exports = router;
