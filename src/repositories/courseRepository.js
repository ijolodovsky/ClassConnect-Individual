const pkg = require("pg");

const DBConfig = require("../dbConfig.js");

class CourseRepository {
  constructor() {
    const { Client } = pkg;
    this.DBClient = new Client(DBConfig);
    this.DBClient.connect();
  }

  async getAllCourses() {
    let returnEntity = null;
    try {
      const sql = "SELECT * FROM courses";
      const result = await this.DBClient.query(sql);

      if (result.rowCount > 0) {
        returnEntity = result.rows;
      }
    } catch (error) {
      console.error(error);
    }
    return returnEntity;
  }

  async getCourseById(id) {
    let returnEntity = null;
    try {
      const sql = "SELECT * FROM courses WHERE id = $1";
      const result = await this.DBClient.query(sql, [id]);

      if (result.rowCount > 0) {
        returnEntity = result.rows[0];
      }
    } catch (error) {
      console.error(error);
    }
    return returnEntity;
  }

  async createCourse(course) {
    let rowsAffected = 0;
    try {
      const sql =
        "INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *";
      const result = await this.DBClient.query(sql, [
        course.title,
        course.description,
      ]);

      if (result.rowCount > 0) {
        rowsAffected = result.rowCount;
      }
    } catch (error) {
      console.error(error);
    }
    return rowsAffected > 0;
  }

  async deleteCourse(id) {
    let rowsAffected = 0;
    try {
      const sql = "DELETE FROM courses WHERE id = $1 RETURNING *";
      const result = await this.DBClient.query(sql, [id]);

      if (result.rowCount > 0) {
        rowsAffected = result.rowCount;
      }
    } catch (error) {
      console.error(error);
    }
    return rowsAffected > 0;
  }
}

module.exports = CourseRepository;