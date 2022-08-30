const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    console.log(from , to);
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender:from
    });
    if (data) return res.json({ msg: "messge added sucessfully" });
    else return res.json({ msg: "fail to add messge" });
  } catch (error) {
    next(error);
  }
};
module.exports.getMessage = async (req, res, next) => {
  try {
    
  } catch (error) {
    next(error)
  }
};
