import CourseService from "../services/courseService.js";
import { Course } from "../entities/course.js";
import { Router } from "express";

const courseService = new CourseService();
const router = Router();

router.get("/", async (req, res) => {

  try{
    const courses = await courseService.getAllCourses();
    res.json({data: courses});
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({
      type: "error",
      title: "Internal Server Error",
      status: 500,
      detail: "An unexpected error occurred",
      instance: req.originalUrl,
    });
  }
});

router.get("/:id", async (req, res) => {
    try {
      const course = await courseService.getCourseById(req.params.id);
  
      if (!course) {
        return res.status(404).json({
          type: "error",
          title: "Not Found",
          status: 404,
          detail: `Course with id ${req.params.id} not found`,
          instance: req.originalUrl,
        });
      }
  
      res.json({ data: course });
  
    } catch (error) {
      if (error.message === "CourseNotFound") {
        return res.status(404).json({
          type: "error",
          title: "Not Found",
          status: 404,
          detail: `Course with id ${req.params.id} not found`,
          instance: req.originalUrl,
        });
      }
  
      console.error("Internal Server Error:", error);
      return res.status(500).json({
        type: "error",
        title: "Internal Server Error",
        status: 500,
        detail: "An unexpected error occurred",
        instance: req.originalUrl,
      });
    }
  }); 

  router.post("/", async (req, res) => {
    try{
      const course = new Course(null, req.body.title, req.body.description);
      const courseCreated = await courseService.createCourse(course);
      res.json(courseCreated);
    } catch (error) {
      console.error("Internal Server Error:", error);
      return res.status(500).json({
        type: "error",
        title: "Internal Server Error",
        status: 500,
        detail: "An unexpected error occurred",
        instance: req.originalUrl,
      });
    }
  });
  
  router.delete("/:id", async (req, res) => {
      try {
          const courseDeleted = await courseService.deleteCourse(req.params.id);
          if (!courseDeleted) {
          return res.status(404).json({
              type: "error",
              title: "Course Not Found",
              status: 404,
              detail: `Course with id ${req.params.id} not found`,
              instance: req.originalUrl,
          });
          }
          res.json(courseDeleted);
      } catch (error) {
          console.error("Internal Server Error:", error);
          return res.status(500).json({
          type: "error",
          title: "Internal Server Error",
          status: 500,
          detail: "An unexpected error occurred",
          instance: req.originalUrl,
          });
      }
  });
  export default router;