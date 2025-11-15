const express = require('express');
const router = express.Router();
const { fetchGNews, fetchReddit } = require('../services/fetchSources');
const sentimentService = require('../services/sentiment');
const topicService = require('../services/clustering');
const Mention = require('../models/Mention');
const { detectSpike } = require('../services/spike');

router.get('/', async (req, res) => {
  try {
    const q = req.query.q || req.query.brand || "samsung";

    const [news, reddit] = await Promise.all([
      fetchGNews(q, 12),
      fetchReddit(q, 12)
    ]);

    let processed = [];
    const items = [...news, ...reddit];

    for (const it of items) {
      if (!it.content) continue;

      const sentiment = await sentimentService.analyze(it.content);
      const topic = topicService.assignTopic(it.content);

      const doc = {
        source: it.source,
        content: it.content,
        url: it.url,
        sentiment,
        topic,
        createdAt: it.createdAt || new Date()
      };

      const filter = it.url
        ? { url: it.url }
        : { text: it.text.slice(0, 200) };

      await Mention.updateOne(filter, { $set: doc }, { upsert: true });
      processed.push(doc);
    }

    const recent = await Mention.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    const summary = { total: recent.length, positive: 0, neutral: 0, negative: 0 };
    recent.forEach(r => summary[r.sentiment]++);

    const spike = await detectSpike({});

    res.json({
      items: recent,          
      summary,
      spike,
      processedCount: processed.length
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
