const { ValidateEditProfileData } = require("../utils/validation");
const { isLocale } = require("validator");
const bcrypt = require("bcrypt");

exports.profileView = async (req, res, next) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERR::" + err.message);
  }
};

exports.profileEdit = async (req, res, next) => {
  try {
    if (!ValidateEditProfileData(req)) {
      throw new Error("Invalid edit Request");
    }
    const loggedInUser = req.user;
    // // loggedInUser.name = req.body.name;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.name} user profile has been updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Err: " + err.message);
  }
};

exports.changePass = async (req, res, next) => {
  try {
    const user = req.user;
    const oldPass = req.body.oldPass;
    const isPassMatch = await bcrypt.compare(oldPass, user.password);
    if (!isPassMatch) {
      throw new Error("Write correct Password");
    }
    const newPass = req.body.newpass;
    const hashedNewPass = await bcrypt.hash(newPass, 10);

    user.password = hashedNewPass;

    await user.save();
    res.send({
      message: `${user.name}, Your Pass has been changed sussfully`,
    });
  } catch (err) {
    res.status(400).send("Err: " + err.message);
  }
};
