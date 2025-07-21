const express = require('express');
const Bookmark = require('../models/Bookmark');
const auth = require('../middleware/authMiddleware');
const axios = require('axios');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.user.id });
  res.json(bookmarks);
});

router.post('/', auth, async (req, res) => {
  const { url } = req.body;
  const metadata = await axios.get(`https://r.jina.ai/${url}`);
  const { title, description } = metadata.data;
  const favicon = `${new URL(url).origin}/favicon.ico`;
  const bookmark = await Bookmark.create({
    url,
    title,
    favicon,
    summary: description,
    userId: req.user.id
  });
  res.json(bookmark);
});

router.delete('/:id', auth, async (req, res) => {
  await Bookmark.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
