const pkg = require("pg");
require("dotenv").config();
const logger = require("../logger");

class CourseRepository {
  constructor() {
    const { Client } = pkg;
    this.DBClient = new Client({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    });

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
      logger.error("Error al obtener todos los cursos:", error);
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
      logger.error("Error al obtener el curso por ID:", error);
    }
    return returnEntity;
  }

  async createCourse(course) {
    let createdCourse = null;
    try {
      const sql =
        "INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *";
      const result = await this.DBClient.query(sql, [
        course.title,
        course.description,
      ]);

      if (result.rowCount > 0) {
        createdCourse = result.rows[0];
      }
    } catch (error) {
      logger.error("Error al crear curso:", error);
    }
    return createdCourse;
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
      logger.error("Error al eliminar curso:", error);
    }
    return rowsAffected > 0;
  }

  async closeConnection() {
    try {
      await this.DBClient.end();
      logger.info("Conexión a la base de datos cerrada");
    } catch (error) {
      logger.error("Error al cerrar la conexión a la base de datos:", error);
    }
  }
}

module.exports = CourseRepository;
