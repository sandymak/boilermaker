const router = require('express').Router();

module.exports = router;

// api/howl/test
router.get('/test', (req, res, next) => {
  res.json({test: 'passed'})
})

// api/howl/
router.get('/', (req, res, next) => {
  res.json({get: 'fetched'})
});

// api/howl
router.post('/', (req, res, next) => {
  res.json({post: 'created'})
});

// api/howl/:howlId
router.put('/:howlId', (req, res, next) => {
  res.json({put: 'updated'})
});

// api/howl/:howlId
router.delete('/:howlId', (req, res, next) => {
  res.json({delete: 'removed'})
});
