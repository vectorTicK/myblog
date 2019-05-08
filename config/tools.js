const bcrypt = require("bcryptjs");

const tools = {
    enBcrypt(password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    comparePassword(login_pwd, user_pwd_hash) {
        return bcrypt.compareSync(login_pwd, user_pwd_hash);
    }
};

module.exports = tools;

