const path = require('path');

const { contactUs, user, contactUsReason } = require('../../../config/db').db;

async function index(req, res) {
  // slow query as it takes 1 to 2 sec.
  // const contactUsShow = await contactUs.findAll({
  //   include: [
  //     {
  //       model: user,
  //       attributes: ['username', 'mobile'],
  //     },
  //     {
  //       model: contactUsReason,
  //       attributes: ['reasonType'],
  //     },
  //   ],
  //   attributes: ['body', 'imageOrVideo'],
  // });

  // faster query
  const contactUsShow = [];
  await contactUs.findAll().map(async (oneContactUs) => {
    const userFound = await user.find({
      where: { id: oneContactUs.userId },
      attributes: ['username', 'mobile'],
    });
    const contactReason = await contactUsReason.find({
      where: { id: oneContactUs.contactUsReasonTypeId },
      attributes: ['reasonType'],
    });
    contactUsShow.push({
      username: userFound.username,
      mobile: userFound.mobile,
      ContactUsReason: contactReason.reasonType,
      body: oneContactUs.body,
    });
  });

  res.json(contactUsShow);
}

// this function will use form-data header not raw header as no json will be posted
async function uploadPhoto(req, res, next) {
  const file = req.files;
  const imageData = {
    originalName: file.originalname,
    mimeType: file.mimetype,
    path: `http://${req.hostname}:${process.env.PORT}/static/${file.filename}`,
    filename: file.filename,
    size: file.size,
  };
  res.json(imageData);
}

async function postContactUs(req, res, next) {
  // @TODO validation
  // @TODO return result or error from uploading image
  const createdContactUs = await contactUs.create({
    contactUsReasonTypeId: req.body.contactUsReasonTypeId,
    body: req.body.body,
    imageOrVideo: req.file ? req.file.path : null,
    userId: req.body.userId,
  });
  return res.json(createdContactUs);
}

module.exports = {
  index,
  postContactUs,
  uploadPhoto,
};
