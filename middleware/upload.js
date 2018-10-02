const multer = require('multer');
const path = require('path');
const randomString = require('randomatic');

const { logger } = require('../config/logger');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, process.env.UPLOAD_FOLDER);
  },
  filename(req, file, callback) {
    const filename = Date.now() + randomString('a0', 64) + path.parse(file.originalname).ext;
    callback(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    const size = Number(req.get('content-length')) <= Number(process.env.FILE_SIZE_TO_UPLOAD);
    const filetypes = /jpeg|jpg|mp4|mov|flv|wmv|avi/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname && size) {
      return callback(null, file);
    }
    if (!size) {
      return callback({ message: 'File uploaded is too large, accepts only 10 M max size', status: 412 });
    }
    return callback({ message: `File upload only supports the following filetypes - ${filetypes}`, status: 412 });
  },
}).single('file');

module.exports = {
  upload,
};
