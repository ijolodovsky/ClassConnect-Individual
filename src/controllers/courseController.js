const CourseService = require("../services/courseService.js");
const Course = require("../entities/course.js");
const { Router } = require("express");
const {
  NotFoundError,
  ValidationError,
} = require("../middleware/errorMiddleware");
const logger = require("../logger");

const courseService = new CourseService();
const router = Router();

/**
 * @route   GET /courses
 * @desc    Obtiene la lista de todos los cursos disponibles.
 * @return  { data: Course[] }
 * @example
 *  Request: GET /courses
 *
 *  Response:
 *  {
 *    "data": [
 *      { "id": 1, "title": "JavaScript Basics", "description": "Curso de introducción a JS" },
 *      { "id": 2, "title": "Node.js Fundamentals", "description": "Curso sobre Node.js" }
 *    ]
 *  }
 */
router.get("/", async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    logger.info(`Fetched ${courses.length} courses`);
    res.json({ data: courses });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /courses/:id
 * @desc    Obtiene un curso específico por su ID.
 * @param   {string} id - ID del curso a obtener.
 * @return  { data: Course }
 * @example
 *  Request: GET /courses/1
 *
 *  Response:
 *  {
 *    "data": {
 *      "id": 1,
 *      "title": "JavaScript Basics",
 *      "description": "Curso de introducción a JS"
 *    }
 *  }
 */
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

/**
 * @route   POST /courses
 * @desc    Crea un nuevo curso.
 * @body    { title: string, description: string (50-255 caracteres) }
 * @return  { data: Course }
 * @example
 *  Request:
 *  {
 *    "title": "JavaScript Basics",
 *    "description": "Un curso introductorio sobre JavaScript"
 *  }
 *
 *  Response:
 *  {
 *    "data": {
 *      "id": 1,
 *      "title": "JavaScript Basics",
 *      "description": "Un curso introductorio sobre JavaScript"
 *    }
 *  }
 */
router.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      logger.warn("Validation failed: Missing title or description");
      throw new ValidationError("Title and description are required");
    }

    if (description.length < 50 || description.length > 255) {
      logger.warn(
        `Validation failed: Description length (${description.length}) is invalid`
      );
      throw new ValidationError(
        "Description must be between 50 and 255 characters"
      );
    }

    const course = new Course(null, title, description);
    const courseCreated = await courseService.createCourse(course);

    logger.info(
      `Created course with title "${title}" and id ${courseCreated.id}`
    );
    res.status(201).json({ data: courseCreated });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /courses/:id
 * @desc    Elimina un curso por su ID.
 * @param   {string} id - ID del curso a eliminar.
 * @return  { status: 204 } (No Content)
 * @example
 *  Request: DELETE /courses/1
 *
 *  Response: 204 No Content
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const courseDeleted = await courseService.deleteCourse(req.params.id);
    if (!courseDeleted) {
      logger.warn(
        `Attempted to delete non-existent course with id ${req.params.id}`
      );
      throw new NotFoundError(`Course with id ${req.params.id} not found`);
    }

    logger.info(`Deleted course with id ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
