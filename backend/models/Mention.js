const mongoose = require('mongoose');

const mentionSchema = new mongoose.Schema({
  source: String,
  content: String,
  sentiment: String, 
  cluster: String,
  keywords: [String],
  url: String,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Mention = mongoose.model('Mention', mentionSchema);
module.exports = Mention;
