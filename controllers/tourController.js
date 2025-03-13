const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    // Query the database
    const tours = await Tour.find();
    // Send the response
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    // Query the database
    const tour = await Tour.findById(req.params.id);
    // Send the response
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: `Error: ${err.message}`,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();

    // Query the database
    const newTour = await Tour.create(req.body);
    // Send the response
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `Invalid data: ${err.message}`,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    // Query the database
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // Send the response
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: `Error: ${err.message}`,
    });
  }
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
