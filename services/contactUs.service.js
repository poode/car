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

module.exports = {
  limitedContactUs,
};
