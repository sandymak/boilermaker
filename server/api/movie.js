'use strict';
const router = require('express').Router();

module.exports = router;

// api/movie/test
router.get('/test', (req, res, next) => {
  res.json({test: 'passed'})
})

// api/movie/
router.get('/', (req, res, next) => {
  res.json({get: 'fetched'})
});

// api/movie
router.post('/', (req, res, next) => {
  res.json({post: 'created'})
});

// api/howl/:movieId
router.put('/:movieId', (req, res, next) => {
  res.json({put: 'updated'})
});

// api/howl/:movieId
router.delete('/:movieId', (req, res, next) => {
  res.json({delete: 'removed'})
});
