const { Router } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = Router();
const User = require("../../models/User");

const { getRandom } = require("../../helpers/utils");

router.post("/", (req, res) => {
  const { name, email, phone, password, userRef } = req.body;

  if (!name || !email || !phone || !password) {
    return res
      .status(400)
      .json({ msg: "Please enter name, email, phone & password" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      phone,
      account_number: getRandom(11),
      account_balance: getRandom(5),
      userRef,
      password,
    });

    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then((user) => {
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
  });
});

module.exports = router;
