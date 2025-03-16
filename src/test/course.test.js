const request = require("supertest");
const app = require("../server");
const server = app.listen();

describe("All Courses", () => {
  
  afterAll(() => {
    server.close();
  });

  describe("GET /courses", () => {
    it("should return all courses with status 200", async () => {
      const response = await request(app).get("/courses");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("GET /courses/:id", () => {
    it("should return a course by ID with status 200", async () => {
      const courseId = 2;
      const response = await request(app).get(`/courses/${courseId}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("id", courseId);
    });

    it("should return 404 if course is not found", async () => {
      const nonExistentId = "999999";
      const response = await request(app).get(`/courses/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.title).toBe("Not Found");
    });
  });

  describe("POST /courses", () => {
    it("should create a new course and return it with status 201", async () => {
      const newCourse = {
        title: "Node.js Basics",
        description: "Learn the basics of Node.js for backend development",
      };

      const response = await request(app).post("/courses").send(newCourse);

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("title", newCourse.title);
      expect(response.body.data).toHaveProperty(
        "description",
        newCourse.description
      );
    });

    it("should return 400 if title or description is missing", async () => {
      const invalidCourse = { title: "", description: "" };

      const response = await request(app).post("/courses").send(invalidCourse);

      expect(response.status).toBe(400);
      expect(response.body.title).toBe("Bad Request");
      expect(response.body.detail).toBe("Title and description are required");
    });
  });

  describe("DELETE /courses/:id", () => {
    it("should delete a course with status 204", async () => {
      const courseId = 1;  // Asegúrate de que este curso existe
  
      const response = await request(app).delete(`/courses/${courseId}`);
  
      expect(response.status).toBe(204); // No se espera cuerpo
      expect(response.body).toEqual({});  // No debe haber contenido en el cuerpo
    });

    it("should return 404 if course is not found", async () => {
      const nonExistentId = "999999";
      const response = await request(app).delete(`/courses/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.title).toBe("Course Not Found");
    });
  });
});
