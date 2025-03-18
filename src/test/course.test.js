const request = require("supertest");
const app = require("../server");
const CourseRepository = require("../repositories/courseRepository");

jest.mock("../repositories/courseRepository");

describe("ClassConnect API", () => {
  let createdCourseId;
  let server;

  beforeAll(() => {
    process.env.NODE_ENV = "test";
    server = app.listen(3001);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe obtener la lista de cursos", async () => {
    const mockCourses = [
      { id: 1, title: "Curso 1", description: "Descripción larga" },
    ];
    CourseRepository.prototype.getAllCourses.mockResolvedValue(mockCourses);

    const res = await request(app).get("/courses");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockCourses);
  });

  test("Debe crear un nuevo curso", async () => {
    const newCourse = {
      title: "Node.js Curso",
      description:
        "Descripción válida con la cantidad de caracteres necesarios.",
    };
    const mockCourse = { id: 10, ...newCourse };

    CourseRepository.prototype.createCourse.mockResolvedValue(mockCourse);

    const res = await request(app).post("/courses").send(newCourse);

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual(mockCourse);
    createdCourseId = res.body.data.id;
  });

  test("Debe retornar 400 si la descripción tiene menos de 50 caracteres", async () => {
    const invalidCourse = { title: "Node.js Curso", description: "Corta" };

    const res = await request(app).post("/courses").send(invalidCourse);

    expect(res.status).toBe(400);
    expect(res.body.detail).toBe(
      "Description must be between 50 and 255 characters"
    );
  });

  test("Debe retornar 400 si la descripción tiene más de 255 caracteres", async () => {
    const invalidCourse = {
      title: "Node.js Curso",
      description: "E".repeat(256),
    };

    const res = await request(app).post("/courses").send(invalidCourse);

    expect(res.status).toBe(400);
    expect(res.body.detail).toBe(
      "Description must be between 50 and 255 characters"
    );
  });

  test("Debe obtener un curso por ID", async () => {
    const mockCourse = {
      id: 10,
      title: "Node.js Curso",
      description: "Descripción válida.",
    };
    CourseRepository.prototype.getCourseById.mockResolvedValue(mockCourse);

    const res = await request(app).get(`/courses/${mockCourse.id}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockCourse);
  });

  test("Debe retornar 404 si no se encuentra un curso por ID", async () => {
    const nonExistentCourseId = 999;
    CourseRepository.prototype.getCourseById.mockResolvedValue(null);

    const res = await request(app).get(`/courses/${nonExistentCourseId}`);

    expect(res.status).toBe(404);
    expect(res.body.detail).toBe(
      `Course with id ${nonExistentCourseId} not found`
    );
  });

  test("Debe eliminar un curso existente", async () => {
    CourseRepository.prototype.deleteCourse.mockResolvedValue(true);

    const res = await request(app).delete(`/courses/${createdCourseId}`);

    expect(res.status).toBe(204);
  });

  test("Debe retornar 404 si intenta eliminar un curso inexistente", async () => {
    const nonExistentCourseId = 999;
    CourseRepository.prototype.deleteCourse.mockResolvedValue(false);

    const res = await request(app).delete(`/courses/${nonExistentCourseId}`);

    expect(res.status).toBe(404);
    expect(res.body.detail).toBe(
      `Course with id ${nonExistentCourseId} not found`
    );
  });

  test("Debe retornar 500 en caso de un error interno en la API", async () => {
    const newCourse = {
      title: "Node.js Curso",
      description:
        "Descripción válida con la cantidad de caracteres necesarios.",
    };
    CourseRepository.prototype.createCourse.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const res = await request(app).post("/courses").send(newCourse);

    expect(res.status).toBe(500);
    expect(res.body.detail).toBe("An unexpected error occurred");
  });
});
