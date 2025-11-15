const express = require("express");
const router = express.Router();
const Mention = require("../models/Mention");
const { extractKeywords } = require('../services/keywordExtractor');

router.get("/", async (req, res) => {
  try {
    const mentions = await Mention.find().sort({ createdAt: -1 }).lean();
    res.json(mentions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.content || !req.body.source) {
      return res.status(400).json({ error: 'source & content are required!' });
    }

    const keywords = extractKeywords(req.body.content);

    const newMention = await Mention.create({
      source: req.body.source,
      text: req.body.content,
      sentiment: req.body.sentiment || "neutral",
      url: req.body.url || "",
      keywords
    });

    req.app.get("io").emit("newMention", newMention);

    res.json(newMention);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
