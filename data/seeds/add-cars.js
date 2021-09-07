exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert([
    {
      vin: "abc123def",
      make: "Nissan",
      model: "Sentra",
      mileage: 24422,
      title: "Marat Kotik",
      transmission: "Good",
    },
    {
      vin: "f02j2sja9",
      make: "Nissan",
      model: "Pathfinder",
      mileage: 69012,
      title: "Derek Chopper",
      transmission: "Good",
    },
    {
      vin: "ajf0s2j38",
      make: "Honda",
      model: "Accord",
      mileage: 42201,
      title: "Jenn Mckasik",
      transmission: "Not Good",
    },
    {
      vin: "gh9s83js9",
      make: "Honda",
      model: "Civic",
      mileage: 101242,
      title: "Brianna Clark",
      transmission: "Needs Repair",
    },
  ]);
};
