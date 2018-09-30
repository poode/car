const { saveMedia } = require('../../../util/helpers/upload');

const { ContactUs } = require('../models/contactUs');
const { User } = require('../models/user');
const { ContactUsReason } = require('../models/contactUsReason');

async function index(req, res) {
  const contactUsShow = [];
  await ContactUs.findAll().map(async (oneContactUs) => {
    const user = await User.find({
      where: { id: oneContactUs.userId },
      attributes: ['username', 'mobile'],
    });
    const contactReason = await ContactUsReason.find({
      where: { id: oneContactUs.contactUsReasonTypeId },
      attributes: ['reasonType'],
    });
    contactUsShow.push({
      username: user.username,
      ContactUsReason: contactReason.reasonType,
      body: oneContactUs.body,
      mobile: user.mobile,
    });
  });

  res.json(contactUsShow);
}

async function postContactUs(req, res, next) {
  // @TODO validation
  // @TODO return result or error from uploading image
  const { uploaded, error } = await saveMedia(req);
  if (error) return next(error);
  if (!uploaded) {
    return next({ message: 'failed in uploading attachment', status: 500 });
  }
  const createdContactUs = await ContactUs.create({
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
};
