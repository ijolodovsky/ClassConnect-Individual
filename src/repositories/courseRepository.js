import pkg from "pg";

import { DBConfig } from "../dbConfig.js";

export default class CourseRepository {
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
}