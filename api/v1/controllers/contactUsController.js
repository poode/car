const path = require('path');

const { contactUs, user, contactUsReason } = require('../../../config/db').db;
const { limitedContactUs } = require('../../../services/contactUs.service.js');
const { validate } = require('../../../util/helpers/validation');
const contactUsSchema = require('../schema/contactUsSchema.json');
const { pagination } = require('../../../util/PaginationUtil/pagination');


async function index(req, res) {
  // slow query as it takes 1 to 2 sec.
  const contactUsShow = await contactUs.findAll({
    include: [
      {
        model: user,
        attributes: ['username', 'mobile'],
      },
      {
        model: contactUsReason,
        attributes: ['reasonType'],
      },
    ],
    attributes: ['body', 'imageOrVideoPath'],
  });

  // faster query
  // const contactUsShow = [];
  // await contactUs.findAll().map(async (oneContactUs) => {
  //   const userFound = await user.find({
  //     where: { id: oneContactUs.userId },
  //     attributes: ['username', 'mobile'],
  //   });
  //   const contactReason = await contactUsReason.find({
  //     where: { id: oneContactUs.contactUsReasonTypeId },
  //     attributes: ['reasonType'],
  //   });
  //   contactUsShow.push({
  //     username: userFound.username,
  //     mobile: userFound.mobile,
  //     ContactUsReason: contactReason.reasonType,
  //     body: oneContactUs.body,
  //     filePath: oneContactUs.imageOrVideoPath,
  //   });
  // });

  res.json(contactUsShow);
}

async function postContactUs(req, res, next) {
  // convert IDs to be numbers as I configured them to be numbers in here and Database
  req.body.contactUsReasonTypeId = Number(req.body.contactUsReasonTypeId);
  req.body.userId = Number(req.body.userId);

  const errors = validate(contactUsSchema, req.body);
  if (errors.length) return next({ message: errors, status: 400 });

  const createdContactUs = await contactUs.create({
    contactUsReasonTypeId: Number(req.body.contactUsReasonTypeId),
    body: req.body.body,
    imageOrVideoPath: req.file ? req.file.path : null,
    userId: Number(req.body.userId),
  });

  const contactUsResponse = {
    data: createdContactUs,
    file: req.file ? req.file : null,
  };

  return res.json(contactUsResponse);
}

// this function will use form-data header not raw header as no json will be posted
async function uploadPhoto(req, res, next) {
  const { file } = req;
  if (file) {
    const uploadedFile = {
      originalName: file.originalname,
      mimeType: file.mimetype,
      path: `/static/${file.filename}`,
      filename: file.filename,
      size: file.size,
    };
    req.file = uploadedFile;
  }
  return postContactUs(req, res, next);
}

async function contactUsLimited(req, res, next) {
  const { result, error } = await limitedContactUs(contactUs, req);
  if (error) return next(error);
  return res.json(result);
}

module.exports = {
  index,
  postContactUs,
  uploadPhoto,
  contactUsLimited,
};
