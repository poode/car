const multer = require('multer');
const { logger } = require('../../config/logger');

const SystemPath = __dirname.split('car')[0];

exports.saveMedia = async (req, res) => {
  const result = {
    uploaded: '',
    error: '',
  };

  const storage = multer.diskStorage({
    destinationLocation: (req, file, callback) => {
      callback(null, (`${SystemPath}/car/uploads`));
    },
    get destination() {
      return this.destinationLocation;
    },
    set destination(value) {
      this.destinationLocation = value;
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage }).any('file');

  return upload(req, res, (err) => {
    if (err) {
      result.error = { message: err.message, status: 500 };
      return result;
    }
    const results = req.files.map(file => ({
      mediaName: file.filename,
      origMediaName: file.originalname,
      mediaSource: `http://${req.headers.host}${SystemPath}/car/uploads/${file.filename}`,
    }));
    result.uploaded = results;
    return result;
  });
};
