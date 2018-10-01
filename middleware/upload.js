const multer = require('multer');
const path = require('path');

const { logger } = require('../config/logger');

const upload = multer({
  dest: process.env.UPLOAD_FOLDER,
  fileFilter(req, file, next) {
    const size = Number(req.get('content-length')) <= Number(process.env.FILE_SIZE_TO_UPLOAD);
    const filetypes = /jpeg|jpg|mp4|mov|flv|wmv|avi/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    logger.debug(`${mimetype} ${extname} ${size} ${JSON.stringify(file)}`);
    if (mimetype && extname && size) {
      return next();
    }
    return next({ message: `Error: File upload only supports the following filetypes - ${filetypes}`, status: 412 });
  },
});

module.exports = {
  upload,
};
