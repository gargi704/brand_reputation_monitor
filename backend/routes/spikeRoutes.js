const express = require('express');
const router = express.Router();
const { detectSpike } = require('../services/spike');

router.get('/spike', async (req, res) => {
  try {
    const windowMinutes = parseInt(req.query.windowMinutes) || 10;
    const baselineHours = parseInt(req.query.baselineHours) || 6;
    const thresholdMultiplier = parseFloat(req.query.thresholdMultiplier) || 2;
    const spike = await detectSpike({ windowMinutes, baselineHours, thresholdMultiplier });
    res.json(spike);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
