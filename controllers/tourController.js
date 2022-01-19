const Tours = require('./../models/toursModel');
const ApiFeatures = require("../utils/apiFeatures");

exports.getFiveCheapTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'price,name,ratingsAverage,duration';

  next();
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