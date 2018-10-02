const { pagination } = require('../util/PaginationUtil/pagination');
const { contactUs, user, contactUsReason } = require('../config/db').db;
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

  const contactUsShow = [];
  paginated.result.map(async (singleContactUs) => {
    const userFound = await user.find({
      where: { id: singleContactUs.userId },
      attributes: ['username', 'mobile'],
    });

    const contactReason = await contactUsReason.find({
      where: { id: singleContactUs.contactUsReasonTypeId },
      attributes: ['reasonType'],
    });

    contactUsShow.push({
      username: userFound.username,
      mobile: userFound.mobile,
      ContactUsReason: contactReason.reasonType,
      body: singleContactUs.body,
      filePath: singleContactUs.imageOrVideoPath,
    });
  });
  // @TODO pick results and wait for them
  const picked = {
    list: contactUsShow,
    count: paginated.count,
    pages: paginated.pages,
  };

  results.result = picked;
  return results;
}

module.exports = {
  limitedContactUs,
};
