const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = Router();
const User = require("../../models/User");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    bcryptjs.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("barterSecret"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;

          return res.status(200).json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              account_balance: user.account_balance,
              account_number: user.account_number,
            },
          });
        }
      );
    });
  });
});

module.exports = router;
