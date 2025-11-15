const Mention = require('../models/Mention');

async function detectSpike({ windowMinutes = 10, baselineHours = 0.25, thresholdMultiplier = 1 } = {}) {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);
  const baselineStart = new Date(now.getTime() - baselineHours * 60 * 60 * 1000);

  const lastWindowCount = await Mention.countDocuments({ createdAt: { $gte: windowStart } });

  const pipeline = [
    { $match: { createdAt: { $gte: baselineStart } } },
    {
      $group: {
        _id: { $hour: "$createdAt" },
        count: { $sum: 1 },
      },
    },
  ];
  const buckets = await Mention.aggregate(pipeline);
  const totalBaseline = buckets.reduce((s, b) => s + (b.count || 0), 0);
  const avgPerHour = baselineHours ? totalBaseline / Math.max(1, baselineHours) : 0;
  const avgWindow = avgPerHour * (windowMinutes / 60);
  const isSpike = avgWindow > 0 ? lastWindowCount > avgWindow * thresholdMultiplier : lastWindowCount >= 5;

  return { isSpike, lastWindowCount, avgWindow };
}

module.exports = { detectSpike };

