function extractKeywords(text) {
  if (!text) return [];
  const stopWords = ["the", "is", "at", "of", "on", "for", "with", "a", "and", "to", "in", "it", "as", "this", "but"];
  return text
    .toLowerCase()
    .split(/[\s,.!?;:()'"-]+/)
    .filter(token => token.length > 3 && !stopWords.includes(token));
}
module.exports = { extractKeywords };
