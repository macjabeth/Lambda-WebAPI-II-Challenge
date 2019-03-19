const router = require('express').Router();
const db = require('../data/db');

// C - POST
router.post('/', async (req, res) => {
  const { body: post } = req;

  if (!post.title || !post.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  try {
    const withID = await db.insert(post);
    res.status(201).json(Object.assign(post, withID));
  } catch (error) {
    res.status(500).json({
      error: `There was an error while saving the post to the database; ${error}`
    });
  }
});

module.exports = router;
