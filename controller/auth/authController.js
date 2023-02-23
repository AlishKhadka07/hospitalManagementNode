const bcrypt = require("bcryptjs");

const db = require("../../model/index");
const User = db.Users;
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  // Save User to Database

  const user = {
    name: req.body.name,
    email: req.body.email,

    password: bcrypt.hashSync(req.body.password, 8),
  };
  const created = await User.create(user);

  res.json({
    status: 200,
    message: "User was registered successfully!",
    created,
  });
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ where: { email: email } }).then((user) => {
      if (!user) {
        return res.send({ message: "User not found" });
      }
      var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.send({
          accessToken: null,
          message: "Invalid Password",
        });
      }
      var token = jwt.sign({ id: user.id }, "hahaha", {
        expiresIn: 86400,
      });
      res.cookie("token", token);
      res.status(200).send({
        status: 200,
        id: user.id,
        user,
        token,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error" });
  }
};
