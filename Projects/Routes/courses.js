const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Course, validateData } = require("../models/courseModel");
const { category } = require("../models/categoryModel");
const { route } = require("./categories");
const port = process.env.PORT || 8000;

//Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  //console.log(Course)
  res.send(courses);
});

//Get single course
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).send("Provided ID not have any courses");
  res.send(course);
});

//Post method

router.post("/", async (req, res) => {
  const { error } = validateData(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("CategoryID not found");

  const course = new Course({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    creator: req.body.creator,
    rating: req.body.rating,
  });
  await course.save();
  res.send(course);
});

//Put method

router.put("/:id", async (req, res) => {
  const { error } = validateData(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("CategoryID not found");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      creator: req.body.creator,
      rating: req.body.rating,
    },
    { new: true }
  );
  if (!course) return res.status(404).send("Provided ID not have any courses");
  res.send(course);
});

//Delete method
router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course)
    return res
      .status(404)
      .send("Provided ID not have any courses or it not exists");
  res.send(course);
});

module.exports = router;
