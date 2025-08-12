const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
  });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor((Math.random() * 1000));
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://random.imagecdn.app/500/300`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo autem enim eius hic beatae tenetur quisquam delectus, aliquid non aperiam, cumque totam quidem expedita modi ad consequuntur mollitia atque deserunt!',
      price
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})

// https://picsum.photos/500/300
// https://random.imagecdn.app/500/150