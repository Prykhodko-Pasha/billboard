const bcrypt = require("bcryptjs");

export default function isPasswordMatching(password, existedPassword) {
  return bcrypt.compareSync(password, existedPassword);
}
