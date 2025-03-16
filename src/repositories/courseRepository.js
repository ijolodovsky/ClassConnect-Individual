const pkg = require("pg");

require("dotenv").config();

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

    console.log('Usuario:', process.env.DATABASE_USER);
    console.log('Contraseña:', process.env.DATABASE_PASSWORD);

    this.DBClient.connect()
      .then(() => console.log('Conexión a la base de datos exitosa!'))
      .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
      });
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
    return returnEntity;  // Si no hay curso, se devuelve null
  }
  

  async createCourse(course) {
    let createdCourse = null;
    try {
      const sql = "INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *";
      const result = await this.DBClient.query(sql, [course.title, course.description]);
  
      if (result.rowCount > 0) {
        createdCourse = result.rows[0];  // Devuelve el curso creado
      }
    } catch (error) {
      console.error("Error al crear curso:", error);
    }
    return createdCourse;  // Si no se crea el curso, devolverá null
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

  // Opcionalmente puedes cerrar la conexión cuando ya no la necesites
  async closeConnection() {
    try {
      await this.DBClient.end();
      console.log('Conexión a la base de datos cerrada');
    } catch (error) {
      console.error('Error al cerrar la conexión a la base de datos:', error);
    }
  }
}

module.exports = CourseRepository;
