const carService = require("../services/cars");
const { successResponse } = require("../utils/response");
const CarsRepository = require("../repositories/cars");

exports.getCars = async (req, res, next) => {
  const data = await carService.getCars(req.query?.capacity);
  successResponse(res, data);
};

exports.getCarsById = async (req, res, next) => {
  const { id } = req.params;
  const data = await carService.getCarsById(id);
  successResponse(res, data, "Get Cars By Id is Success");
};

exports.createCars = async (req, res, next) => {
  const requestBody = {
    ...req.body,
  };

  const data = await carService.createCars(requestBody, req.files);
  successResponse(res, data);
};

exports.updateCars = async (req, res, next) => {
  const { id } = req.params;
  const Cars = CarsRepository.getCarsById(id);
  const requestBody = {
    ...req.body,
    capacity: parseInt(req.body.capacity, 10) || Cars.capacity,
    rentPerDay: parseInt(req.body.rentPerDay, 10) || Cars.rentPerDay,
    year: parseInt(req.body.year, 10) || Cars.year,
    available:
      req.body.available !== undefined
        ? req.body.available.toLowerCase() === "true"
        : Cars.available,
    availableAt: req.body.availableAt
      ? new Date(req.body.availableAt)
      : Cars.availableAt,
  };
  const updateTheCars = await carService.updateCars(id, requestBody, req.files);
  successResponse(res, updateTheCars, "Update Student is Success");
};

exports.deleteCarsById = async (req, res, next) => {
  const { id } = req.params;
  const deleteTheCars = await carService.deleteCarsById(id);
  successResponse(res, deleteTheCars, "Delete Car is Success");
};
