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
      author: '689ac61205bf6cd43777bf40',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo autem enim eius hic beatae tenetur quisquam delectus, aliquid non aperiam, cumque totam quidem expedita modi ad consequuntur mollitia atque deserunt!',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dicnvyawz/image/upload/v1759085228/YelpCamp/cyrqfk8zxqxz7ykrvn5q.png',
          filename: 'YelpCamp/qsofs05wdunet3cm9tbk',
        },
        {
          url: 'https://res.cloudinary.com/dicnvyawz/image/upload/v1755839908/YelpCamp/uyic6sxwx3ow12612qa7.png',
          filename: 'YelpCamp/uyic6sxwx3ow12612qa7',
        }
      ]
    })
    await camp.save();
  }
  console.log("✅ Database Updated!");
}


seedDB().then(() => {
  mongoose.connection.close();
})

// https://picsum.photos/500/300
// https://random.imagecdn.app/500/150

console.log("✅ Database Updated!");