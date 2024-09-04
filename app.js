const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const Campground = require("./models/Campground");

const app = express();

app.engine("ejs", ejsMate);

app.set("views", path.join(__dirname, "views"));
app.set("viewengine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, "0.0.0.0", () => {
  console.log("Connection open on port 3000");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/yelpCamp")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.render("homepage/index.ejs");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});

  res.render("campgrounds/index.ejs", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit.ejs", { campground });
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);

  console.log(campground);
  res.render("campgrounds/show.ejs", { campground });
});

app.post("/campgrounds", async (req, res) => {
  const data = req.body.campground;
  const campground = new Campground(data);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body.campground;
  await Campground.findByIdAndUpdate(id, data);
  res.redirect(`/campgrounds/${id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect(`/campgrounds`);
});
