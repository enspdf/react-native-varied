const uuid = require("uuid");
const Trx = require("../models/Transactions");
const User = require("../models/User");

module.exports = (app, io, db) => {
  io.on("connection", function (socket) {
    socket.on("joinService", ({ roomID }) => {
      socket.join(roomID);
    });

    socket.on(
      "send",
      ({ amount, account_number, purpose, sender, roomID }, callback) => {
        User.findOne({ account_number }).then((user) => {
          if (!user) return callback({ error: "Sorry not permited" });

          const account_balance = user.account_balance + amount;

          User.findOneAndUpdate(
            { account_number },
            { $set: { account_balance } },
            { new: true },
            (err) => {
              if (err) return callback({ error: "Not updated" });

              User.findOne({ email: sender }).then((sentBy) => {
                const newSenderBalance = sentBy.account_balance - amount;

                User.findOneAndUpdate(
                  {
                    account_number: sentBy.account_number,
                    account_balance: newSenderBalance,
                  },
                  {
                    $set: { account_balance: +newSenderBalance },
                  },
                  { new: true },
                  () => {
                    socket.broadcast
                      .to(roomID)
                      .emit("moneySent", {
                        amount,
                        purpose,
                        user,
                        receiver: user.email,
                        sender,
                      });
                  }
                );
              });
            }
          );
        });
      }
    );
  });
};
