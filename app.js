const express = require("express");
const fs = require("fs");

const morgan = require("morgan");

const app = express();

// 1. MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2. ROUTE HANDLERS

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

function getAllTours(req, res) {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
}

function getTour(req, res) {
  console.log(req.params);

  const tour = tours.find((el) => el.id == req.params.id * 1);

  if (tour) {
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
}

function createTour(req, res) {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
}

function updateTour(req, res) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here>",
    },
  });
}

function deleteTour(req, res) {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
}

function getAllUsers(req, res) {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
}

function createUser(req, res) {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
}
function getUser(req, res) {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
}
function updateUser(req, res) {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
}
function deleteUser(req, res) {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
}

// 3. ROUTES
const tourRouter = express.Router();
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);
app.use("/api/v1/tours", tourRouter);

const userRouter = express.Router();
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
app.use("/api/v1/users", userRouter);

// 4. starting server

const port = 3000;
app.listen(port, () => {
  console.log("App running on port 3000");
});
