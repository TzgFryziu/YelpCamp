const mongoose = require("mongoose");
const Campground = require("../models/Campground");
const { descriptors, places } = require("./seedHelpers");
const cities = require("./cities");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelpCamp")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

const getRandomCampground = (descriptors, places, cities) => {
  const cityIndex = Math.floor(Math.random() * cities.length);
  return new Campground({
    title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${
      places[Math.floor(Math.random() * places.length)]
    }`,
    location: `${cities[cityIndex].city}, ${cities[cityIndex].state}`,
    price: `$${Math.floor(Math.random() * 2000 + 500)}`,
    description: "xxxxxxxxxxxxxxxx",
  });
};

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const temp = getRandomCampground(descriptors, places, cities);
    await temp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
