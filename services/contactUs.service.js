const { contactUs, user, contactUsReason } = require('../config/db').db;
const { pagination } = require('../util/PaginationUtil/pagination');
const contactUsSchema = require('../api/v1/schema/contactUsSchema.json');
const { validate } = require('../util/helpers/validation');
const { logger } = require('../config/logger');

async function limitedContactUs(model, req) {
  const results = {
    result: '',
    error: '',
  };

  const { error, paginated } = await pagination(model, req);

  if (error.message) {
    results.error = { message: error.message, status: error.status };
    return results;
  }

  // Promise.all() is very cool to handle promise inside map()
  const contactUsShow = await Promise.all(paginated.result.map(async (singleContactUs) => {
    const userFound = await user.find({
      where: { id: singleContactUs.userId },
      attributes: ['username', 'mobile'],
    });

    const contactReason = await contactUsReason.find({
      where: { id: singleContactUs.contactUsReasonTypeId },
      attributes: ['reasonType'],
    });

    return {
      body: singleContactUs.body,
      imageOrVideoPath: singleContactUs.imageOrVideoPath,
      user: {
        username: userFound.username,
        mobile: userFound.mobile,
      },
      contactUsReason: {
        reasonType: contactReason.reasonType,
      },
    };
  }));

  const picked = {
    list: contactUsShow,
    count: paginated.count,
    pages: paginated.pages,
  };

  results.result = await picked;
  return results;
}

async function createContactUs(model, req, res) {
  const results = {
    error: '',
    data: '',
  };

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

  req.body.contactUsReasonTypeId = Number(req.body.contactUsReasonTypeId);
  const errors = validate(contactUsSchema, req.body);
  if (errors.length) {
    results.error = { message: errors, status: 400 };
    return results;
  }

  const lastContactUs = await model.findOne({
    where: {
      userId: res.locals.userId,
    },
    order: [
      ['id', 'DESC'],
    ],
  });

  if (!lastContactUs.status) {
    results.error = { message: 'We are sorry, but last contact request did not be handled yet', status: 412 };
    return results;
  }

  const createdContactUs = await model.create({
    contactUsReasonTypeId: Number(req.body.contactUsReasonTypeId),
    body: req.body.body,
    imageOrVideoPath: req.file ? req.file.path : null,
    userId: Number(res.locals.userId),
  });

  const contactUsShow = await model.find({
    where: {
      id: createdContactUs.id,
    },
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

  results.data = {
    data: contactUsShow,
    file: req.file ? req.file : null,
  };
  return results;
}

module.exports = {
  limitedContactUs,
  createContactUs,
};
