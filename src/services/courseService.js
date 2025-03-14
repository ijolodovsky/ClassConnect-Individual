import CourseRepository from "../repositories/courseRepository.js";

export default class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async getAllCourses() {
    return await this.courseRepository.getAllCourses();
  }

  async getCourseById(id) {
    const course = await this.courseRepository.getCourseById(id);
    return course;
  }

  async createCourse(course) {
    const courseCreated = await this.courseRepository.createCourse(course);
    return courseCreated;
  }

  async deleteCourse(id) {
    const courseDeleted = await this.courseRepository.deleteCourse(id);
    return courseDeleted;
  }
}
