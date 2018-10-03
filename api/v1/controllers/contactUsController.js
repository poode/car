const { contactUs, user, contactUsReason } = require('../../../config/db').db;
const { limitedContactUs, createContactUs } = require('../../../services/contactUs.service.js');


async function index(req, res) {
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
    attributes: ['body', 'imageOrVideoPath', 'status'],
  });

  res.json(contactUsShow);
}

async function postContactUs(req, res, next) {
  const { data, error } = await createContactUs(contactUs, req, res);

  if (error) {
    return next(error);
  }

  return res.json(data);
}

async function contactUsLimited(req, res, next) {
  const { result, error } = await limitedContactUs(contactUs, req);
  if (error) return next(error);
  return res.json(result);
}

module.exports = {
  index,
  postContactUs,
  contactUsLimited,
};
