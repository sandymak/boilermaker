const router = require('express').Router();

module.exports = router;

// /api/studio/test
router.get('/test', (req, res, next) => {
  res.send('test passed')
})

// api/studio/
router.get('/', (req, res, next) => {
  res.json({get: 'fetched'})
});

// api/studio
router.post('/', (req, res, next) => {
  res.json({post: 'created'})
});

// api/howl/:studioId
router.put('/:studioId', (req, res, next) => {
  res.json({put: 'updated'})
});

// api/howl/:studioId
router.delete('/:studioId', (req, res, next) => {
  res.json({delete: 'removed'})
});
