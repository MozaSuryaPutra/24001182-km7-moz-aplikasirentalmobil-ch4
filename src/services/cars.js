const carRepository = require("../repositories/cars.js");
const { NotFoundError, InternalServerError } = require("../utils/request.js");
const { imageUpload } = require("../utils/image-kit.js");

exports.getCars = async (capacity) => {
  const cars = await carRepository.getCars(capacity);
  if (cars.length < 1) {
    throw new NotFoundError("Car Is Not Found");
  }
  return cars;
};

exports.getCarsById = async (id) => {
  const carsId = await carRepository.getCarsById(id);
  if (!carsId) {
    throw new NotFoundError("Cars is not found");
  }
  return carsId;
};

exports.createCars = async (data, file) => {
  // Upload file to image kit
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  // Create the data
  return carRepository.createCars(data);
};

exports.updateCars = async (id, data, file) => {
  // find Car is exist or not (validate the data)
  const existingCar = carRepository.getCarsById(id);
  if (!existingCar) {
    throw new NotFoundError("Car is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingCar, // existing Car
    ...data,
  };

  // Upload file to image kit
  if (file?.image) {
    data.image = await imageUpload(file.image);
  }

  // if exist, we will update the Car data
  const updatedCar = carRepository.updateCars(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update Car!"]);
  }

  return updatedCar;
};

exports.deleteCarsById = async (id) => {
  const carsExist = await carRepository.getCarsById(id);
  if (!carsExist) {
    throw new NotFoundError("Cars is not found");
  }
  const deleteCars = await carRepository.deleteCarsById(id);
  if (!deleteCars) {
    throw new InternalServerError("Failed to delete Cars");
  }
  return deleteCars;
};
