const express = require('express');
const covidController = require('../controllers/covidController');

const router = express.Router();

router.get('/get-data', covidController.requestCountryStatistics);
router.get('/:id', covidController.statisticDetails);
router.get('/', covidController.getStatistics);
router.patch('/:id', covidController.updateStatistics);
router.delete('/:id', covidController.removeStatistics);

module.exports = router;
