const TOPICS = {
  election: ['election','result','vote','mla','assembly','bihar','candidate'],
  policy: ['policy','govt','government','scheme'],
  product: ['phone','launch','model','price','battery','camera'],
  service: ['service','support','customer','help', 'customer service'],
};

function assignTopic(text) {
  if (!text) return 'general';
  const t = text.toLowerCase();
  for (const key of Object.keys(TOPICS)) {
    for (const kw of TOPICS[key]) {
      if (t.includes(kw)) return key;
    }
  }
  return 'general';
}

module.exports = { assignTopic };
