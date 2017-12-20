const router = require('express').Router();

module.exports = router;

router.get('/test', (req, res, next) => {
  res.json({test: 'passed'})
})

// api/totoro
router.get('/', (req, res, next) => {
  res.json({get: 'fetched'})
});

// api/totoro
router.post('/', (req, res, next) => {
  res.json({post: 'created'})
});

// api/howl/:totoroId
router.put('/:totoroId', (req, res, next) => {
  res.json({put: 'updated'})
});

// api/howl/:totoroId
router.delete('/:totoroId', (req, res, next) => {
  res.json({delete: 'removed'})
});
