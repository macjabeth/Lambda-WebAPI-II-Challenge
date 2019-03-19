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

// R - GET
router.get('/', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      error: `The posts information could not be retrieved; ${error}`
    });
  }
});

router.get('/:id', async (req, res) => {
  const { params: { id } } = req;

  try {
    const posts = await db.findById(id);
    Boolean(posts.length)
      ? res.status(200).json(posts[0])
      : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
  } catch (error) {
    res.status(500).json({
      error: `The post information could not be retrieved; ${error}`
    });
  }
});

// U - PUT
router.put('/:id', async (req, res) => {
  const {
    body: post,
    params: { id }
  } = req;

  if (!post.title || !post.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  try {
    const count = await db.update(id, post);
    Boolean(count)
      ? res.status(200).json(await db.findById(id))
      : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
  } catch (error) {
    res.status(500).json({
      error: `The post information could not be modified; ${error}`
    });
  }
});

// D
router.delete('/:id', async (req, res) => {
  const { params: { id } } = req;

  try {
    const count = await db.remove(id);
    Boolean(count)
      ? res.status(200).json({ message: 'The post has been deleted.' })
      : res.status(404).json({ message: 'The post with the specified ID does not exist.' });
  } catch (error) {
    res.status(500).json({
      error: `The post could not be removed; ${error}`
    });
  }
});

module.exports = router;
