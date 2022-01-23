const express = require('express');

const {getAllTours, getTour, createTour, deleteTour, updateTour, getFiveCheapTours, getToursStatistics, getBusyestMonth} = require('../controllers/tourController');

const router = express.Router();

router.route('/top-5-cheap').get(getFiveCheapTours, getAllTours)
router.route('/statistics').get(getToursStatistics)
router.route('/busyestMonth/:year').get(getBusyestMonth)
router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);


module.exports = router;