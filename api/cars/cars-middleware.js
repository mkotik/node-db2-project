const Cars = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await Cars.getById(id);
    if (car) {
      req.car = car;
      next();
    } else {
      next({ status: 404, message: "id not found" });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || !mileage) {
    next({
      status: 400,
      message: `${vin ? "" : "vin "}${mileage ? "" : "mileage "}${
        model ? "" : "model "
      }${make ? "" : "make "}is missing`,
    });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if (isValidVin) {
    next();
  } else {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const response = await Cars.getByVin(req.body.vin);
  if (response) {
    next({ status: 400, message: `vin ${req.body.vin} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
