const mongoose = require('mongoose');
const BookmarkSchema = new mongoose.Schema({
  url: String,
  title: String,
  favicon: String,
  summary: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Bookmark', BookmarkSchema);