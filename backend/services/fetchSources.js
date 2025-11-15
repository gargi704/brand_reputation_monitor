const axios = require('axios');
const GNEWS_KEY = process.env.GNEWS_API_KEY || '';

async function fetchGNews(q, max=8) {
  if (!GNEWS_KEY) return [];
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&max=${max}&token=${GNEWS_KEY}`;
    const res = await axios.get(url, { timeout: 8000 });
    return (res.data.articles||[]).map(a => ({
      source: 'news',
      content: `${a.title||''} ${a.description||''}`.trim(),
      url: a.url,
      createdAt: a.publishedAt ? new Date(a.publishedAt) : new Date()
    }));
  } catch (e) {
    console.warn('GNews error', e.message);
    return [];
  }
}

async function fetchReddit(q, max=8) {
  try {
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(q)}&limit=${max}&sort=new`;
    const res = await axios.get(url, { headers: { 'User-Agent': 'BrandTracker/1.0' }, timeout: 8000 });
    const children = res.data?.data?.children || [];
    return children.map(c => {
      const d = c.data || {};
      // console.log("REDDIT POST:", d.title);
      return {
        source: 'reddit',
        content: `${d.title||''} ${d.selftext||''}`.trim(),
        url: d.permalink ? `https://reddit.com${d.permalink}` : '',
        createdAt: d.created_utc ? new Date(d.created_utc*1000) : new Date()
      };
    });
  } catch (e) {
    console.warn('Reddit error', e.message);
    return [];
  }
}

module.exports = { fetchGNews, fetchReddit };
