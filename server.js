const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

//TODO: Change this to newer version of mongoose or mongodb
// CONNECT TO MONGO
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.set("strictQuery", false);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  });
// END OF CONNECT TO MONGO

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});
const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "The Park Camper",
  price: 997,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(`ERROR 💥: ${err}`);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
