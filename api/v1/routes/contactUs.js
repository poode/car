const router = require('express-promise-router')();
const { upload } = require('../../../middleware/upload');

const { index, postContactUs, uploadPhoto } = require('../controllers/contactUsController');

router.post('/upload', upload.single('file'), uploadPhoto);

router.post('/', postContactUs);

router.get('/', index);


module.exports = router;
