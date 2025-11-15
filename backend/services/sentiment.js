const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const axios = require('axios');

async function analyze(text) {
  try {
    const r = sentiment.analyze(text || '');
    if (r && typeof r.score === 'number') {
      if (r.score > 0) return 'positive';
      if (r.score < 0) return 'negative';
      return 'neutral';
    }
  } catch (e) { console.warn('local sentiment error', e.message); }

  const HF_KEY = process.env.HF_API_KEY;
  if (HF_KEY) {
    try {
      const res = await axios.post('https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
        { inputs: text },
        { headers: { Authorization: `Bearer ${HF_KEY}` }, timeout: 8000 }
      );
      const label = res.data?.[0]?.label?.toLowerCase();
      if (label?.includes('positive')) return 'positive';
      if (label?.includes('negative')) return 'negative';
    } catch (e) { console.warn('HF sentiment error', e.message); }
  }

  return 'neutral';
}

module.exports = { analyze };
