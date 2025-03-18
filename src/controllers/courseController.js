const CourseService = require("../services/courseService.js");
const Course = require("../entities/course.js");
const { Router } = require("express");
const { NotFoundError, ValidationError } = require("../middleware/errorMiddleware");
const logger = require("../logger");

const courseService = new CourseService();
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    logger.info(`Fetched ${courses.length} courses`);
    res.json({ data: courses });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      logger.warn(`Course with id ${req.params.id} not found`);
      throw new NotFoundError(`Course with id ${req.params.id} not found`);
    }
    logger.info(`Fetched course with id ${req.params.id}`);
    res.status(200).json({ data: course });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      logger.warn("Validation failed: Missing title or description");
      throw new ValidationError("Title and description are required");
    }

    if (description.length < 50 || description.length > 255) {
      logger.warn(`Validation failed: Description length (${description.length}) is invalid`);
      throw new ValidationError("Description must be between 50 and 255 characters");
    }

    const course = new Course(null, title, description);
    const courseCreated = await courseService.createCourse(course);
    
    logger.info(`Created course with title "${title}" and id ${courseCreated.id}`);
    res.status(201).json({ data: courseCreated });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const courseDeleted = await courseService.deleteCourse(req.params.id);
    if (!courseDeleted) {
      logger.warn(`Attempted to delete non-existent course with id ${req.params.id}`);
      throw new NotFoundError(`Course with id ${req.params.id} not found`);
    }

    logger.info(`Deleted course with id ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
