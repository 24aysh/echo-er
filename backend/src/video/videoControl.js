exports.joinVideo = (req, res) => {
  const { roomId, username } = req.query;

  if (!roomId || !username) {
    return res.status(400).json({ error: "Missing roomId or username" });
  }

  res.status(200).json({ roomId, username });
};
