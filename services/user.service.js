const bcrypt = require('bcrypt');

async function bcryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// async function getUser(email) {
//   const user = await User.findOne({ email });
//   return user;
// }

module.exports = {
  bcryptPassword,
};
