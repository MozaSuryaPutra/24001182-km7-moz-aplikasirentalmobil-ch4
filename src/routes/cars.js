const express = require("express");
const {
  validateGetCars,
  validateGetCarsById,
  validateCreateCars,
  validateUpdateCars,
  validateDeleteCars,
} = require("../middlewares/cars.js");
const {
  getCars,
  createCars,
  updateCars,
  deleteCarsById,
} = require("../controllers/cars.js");
const { getCarsById } = require("../controllers/cars.js");

const router = express.Router();

router.get("/", validateGetCars, getCars);
router.get("/:id", validateGetCarsById, getCarsById);
router.post("/", validateCreateCars, createCars);
router.put("/:id", validateUpdateCars, updateCars);
router.delete("/:id", validateDeleteCars, deleteCarsById);
module.exports = router;
