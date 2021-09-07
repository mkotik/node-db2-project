const express = require("express");
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const carsRouter = express.Router();

carsRouter.get("/", async (req, res, next) => {
  try {
    const allCars = await Cars.getAll();
    res.status(200).json(allCars);
  } catch (err) {
    next(err);
  }
});

carsRouter.get("/:id", checkCarId, async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

carsRouter.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    const car = req.body;
    try {
      const newCar = await Cars.create(car);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = carsRouter;
