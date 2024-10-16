const fs = require("fs");
const cars = require("../../data/cars.json");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();
exports.getCars = async (capacity) => {
  // Convert capacity to number if it is a string
  const numericCapacity = Number(capacity);

  const searchedCars = await prisma.cars.findMany({
    where: {
      OR: [{ capacity: { gte: numericCapacity } }],
    },
    include: {
      carModels: {
        include: {
          type: true,
          manufactures: true,
          transmissions: true,
        },
      },
    },
  });

  const serializedCars = JSONBigInt.stringify(searchedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.getCarsById = async (id) => {
  const carsFind = await prisma.cars.findFirst({
    where: {
      id: id,
    },
    include: {
      carModels: {
        include: {
          type: true,
          manufactures: true,
          transmissions: true,
        },
      },
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(carsFind);
  return JSONBigInt.parse(serializedCars);
};

exports.createCars = async (data) => {
  const newCars = await prisma.students.create({
    id: uuidv4(),
    ...data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(newCars);
  return JSONBigInt.parse(serializedCars);
};

exports.updateCars = (id, data) => {
  const index = cars.findIndex((cars) => cars.id === id);

  if (index !== -1) {
    cars.splice(index, 1, {
      ...cars[index],
      ...data,
    });
  } else {
    //TODO
    return null;
  }
  // TODO: Update the json data
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");
  return cars[index];
};

exports.deleteCarsById = (id) => {
  const carsIndex = cars.findIndex((cars) => cars.id == id);
  if (carsIndex < 0) {
    // If no index found
    // TODO: make a error class
    return null;
  }

  // If the index found
  const deletedCars = cars.splice(carsIndex, 1);

  // Update the json
  fs.writeFileSync("./data/cars.json", JSON.stringify(cars, null, 4), "utf-8");

  return deletedCars;
};
