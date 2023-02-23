const { loginUser, registerUser } = require("../controller/auth/authController");

const router = require("express").Router();


router.route("/login").post(loginUser)
router.route("/register").post(registerUser)


module.exports = router ; 