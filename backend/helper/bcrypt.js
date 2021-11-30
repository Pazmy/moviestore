const bcrypt = require("bcrypt");
const salt = 10;
const encrypt = (pwd) => bcrypt.hashSync(pwd, salt);

function comparePwd(pwd, hash) {
  return bcrypt.compareSync(pwd, hash);
}

module.exports = { encrypt, comparePwd };
