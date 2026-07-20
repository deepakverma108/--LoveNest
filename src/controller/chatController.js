const { Chat } = require("../model/chats");
const User = require("../model/user");

exports.chat = async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  try {
    const targetUser = await User.findById(targetUserId).select("name photo");
    if (!targetUser) return res.status(404).json({ error: "User not found" });

    // 1) Find or create the Chat thread
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "_id",
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }

    // 2) Map the messages into a simple array for the frontend
    const payload = chat.messages.map((m) => ({
      text: m.text,
      senderId: m.senderId._id || m.senderId, // ensure it’s an ID
      timestamp: m.createdAt, // if you want timestamps
    }));

    // 3) Send back just the array (not the full document)
    return res.json({ messages: payload, targetUser });
  } catch (err) {
    console.error("Chat history error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
