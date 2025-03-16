const CourseService = require("../services/courseService.js");
const Course = require("../entities/course.js");
const { Router } = require("express");
const logger = require("../logger");

const courseService = new CourseService();
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json({ data: courses });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({
        type: "about:blank",
        title: "Not Found",
        status: 404,
        detail: `Course with id ${req.params.id} not found`,
        instance: req.originalUrl,
      });
    }

    res.status(200).json({ data: course });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({
        type: "about:blank",
        title: "Bad Request",
        status: 400,
        detail: "Title and description are required",
        instance: req.originalUrl,
      });
    }

    const course = new Course(null, req.body.title, req.body.description);
    const courseCreated = await courseService.createCourse(course);

    if (courseCreated) {
      return res.status(201).json({ data: courseCreated });
    } else {
      return res.status(500).json({
        type: "about:blank",
        title: "Internal Server Error",
        status: 500,
        detail: "An unexpected error occurred",
        instance: req.originalUrl,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const courseDeleted = await courseService.deleteCourse(req.params.id);
    if (!courseDeleted) {
      return res.status(404).json({
        type: "about:blank",
        title: "Course Not Found",
        status: 404,
        detail: `Course with id ${req.params.id} not found`,
        instance: req.originalUrl,
      });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
