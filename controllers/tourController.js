const Tours = require('./../models/toursModel');
const ApiFeatures = require("../utils/apiFeatures");

exports.getFiveCheapTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'price,name,ratingsAverage,duration';

  next();
}

exports.getToursStatistics = async (req, res) => {
  try {
    const tourStatistics = await Tours.aggregate([
      {$match: {ratingsAverage: {$gte: 4.5}}},
      {
        $group: {
          _id: '$difficulty',
          countOfTours: {$sum: 1},
          avgRating: {$avg: "$ratingsAverage"},
          avgPrice: {$avg: "$price"},
          minPrice: {$min: "$price"},
          maxPrice: {$max: "$price"},
        }
      },
      {$sort: {avgPrice: 1}}
    ]);

    res.status(200).json({
      status: 'success',
      data: {tourStatistics}
    })
  } catch (err) {
    console.log(err, 'error')
  }
}

exports.getBusyestMonth = async (req, res) => {
  try {
    const year = req.params.year * 1

    const busyestMonth = await Tours.aggregate([
      {$unwind: '$startDates'},
      {$match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          }
        }
        },
      {$group: {
        _id: {$month: '$startDates'},
          sumOfToursForMonth: {$sum: 1},
          tour: {$push: '$name'}
        }},
      {$addFields: {month: `$_id`}},
      {$project: {_id: 0}},
      {$sort: {sumOfToursForMonth: -1}},
      {$limit: 12}
    ])

    res.status(200).json({
      status: 'success',
      data: {busyestMonth}
    })
  } catch (err) {
    res.status(401).json({
      status: 'fail',
    })
  }
}

exports.getAllTours = async (req, res) => {
  try {
    const features = new ApiFeatures(Tours.find(), req.query).filter().sort().limitFields().paginate()
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      data: {tours}
    })
  } catch (err) {
    console.log(err, 'error')
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = Tours.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    console.log('Error', err)
  }
}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tours.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    console.log(err, 'invalid data')
  }

};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};