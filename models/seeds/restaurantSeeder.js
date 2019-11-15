const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurantList = require("../../public/apis/restaurant.json");

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("restaurantSeeder: db error");
});

db.once("open", () => {
  console.log("restaurantSeeder: db connected!");

  restaurantList.results.forEach(el => {
    Restaurant.create({
      name: el.name,
      name_en: el.name_en,
      category: el.category,
      image: el.image,
      location: el.location,
      phone: el.phone,
      google_map: el.google_map,
      rating: el.rating,
      description: el.description
    });
  });

  console.log("restaurantSeeder: done");
});
