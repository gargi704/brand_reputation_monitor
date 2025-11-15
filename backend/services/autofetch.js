const { fetchGNews, fetchReddit } = require('./fetchSources');
const sentimentService = require('./sentiment');
const topicService = require('./clustering');
const Mention = require('../models/Mention');

async function aggregateAndSaveBrands() {
  const myBrands = [
    'amazon', 'flipkart', 'myntra', 'snapdeal', 'walmart',
    'apple', 'samsung', 'xiaomi', 'oppo', 'vivo',
    'jio', 'airtel', 'vi', 'bsnl',
    'tata', 'mahindra', 'honda', 'maruti', 'hyundai',
    'ola', 'uber', 'zomato', 'swiggy', 'bigbasket',
    'paytm', 'phonepe', 'google', 'facebook', 'instagram',
    'twitter', 'adani', 'ambani', 'nike', 'puma',
    'pepsi', 'coca cola', 'dell', 'hp', 'asus',
    'realme', 'oneplus', 'sony', 'lg', 'phillips'
  ];

  for (const brand of myBrands) {
    const [news, reddit] = await Promise.all([
      fetchGNews(brand, 8),
      fetchReddit(brand, 8)
    ]);
    const items = [...news, ...reddit];
    for (const it of items) {
      if (!it.content) continue;
      const sentiment = await sentimentService.analyze(it.content);
      const topic = topicService.assignTopic(it.content);
      const filter = it.url ? { url: it.url } : { content: it.content.slice(0, 200) };
      const doc = {
        source: it.source,
        content: it.content,
        url: it.url,
        sentiment,
        topic,
        createdAt: it.createdAt || new Date()
      };
      await Mention.updateOne(filter, { $set: doc }, { upsert: true });
    }
  }
  console.log("Aggregated latest mentions from news/reddit");
}
module.exports = { aggregateAndSaveBrands };
