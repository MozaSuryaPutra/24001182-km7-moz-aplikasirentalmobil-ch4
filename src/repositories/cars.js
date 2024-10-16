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
  const newCars = await prisma.cars.create({
    data: {
      id: uuidv4(), // Menghasilkan id unik
      ...data, // Spread semua data dari request body ke sini
      rentPerDay: parseInt(data.rentPerDay), // Parsing rentPerDay jadi integer
      capacity: parseInt(data.capacity), // Parsing capacity jadi integer
      availableAt: new Date(data.availableAt), // Parsing availableAt jadi Date
      available: data.available === "true", // Parsing available jadi boolean
      year: parseInt(data.year), // Parsing year jadi integer
      carmodels_id: parseInt(data.carmodels_id), // Parsing carmodels_id jadi integer
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(newCars);
  return JSONBigInt.parse(serializedCars);
};

exports.updateCars = async (id, data) => {
  const updatedCars = await prisma.cars.update({
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
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(updatedCars);
  return JSONBigInt.parse(serializedCars);
};

exports.deleteCarsById = async (id) => {
  const deletedCar = await prisma.cars.delete({
    where: { id: id },
  });

  const serializedCar = JSONBigInt.stringify(deletedCar);
  return JSONBigInt.parse(serializedCar);
};
