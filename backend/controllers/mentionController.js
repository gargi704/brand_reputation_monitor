const Mention = require("../models/Mention");
const { extractKeywords } = require('../services/keywordExtractor');

exports.getMentions = async (req, res) => {
  try {
    const mentions = await Mention.find().sort({ createdAt: -1 }).lean();
    res.json(mentions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addMention = async (req, res) => {
  try {
    if (!req.body.text || !req.body.source) {
      return res.status(400).json({ error: 'Source & text required!' });
    }
    const keywords = extractKeywords(req.body.text);
    const newMention = await Mention.create(req.body);

    const io = req.app.get('io');
    io.emit('newMention', newMention);

    res.json(newMention);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};