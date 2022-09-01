const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "messge added sucessfully" });
    else return res.json({ msg: "fail to add messge" });
  } catch (error) {
    next(error);
  }
};
module.exports.getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updateAt:1 });
    const projectMessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessage);
  } catch (error) {
    next(error);
  }
};

