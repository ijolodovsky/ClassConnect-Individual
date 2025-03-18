const request = require("supertest");
const app = require("../server");
const CourseRepository = require("../repositories/courseRepository");

jest.mock("../repositories/courseRepository");

describe("E2E Tests - Courses API", () => {
  let createdCourseId;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe obtener la lista de cursos", async () => {
    const mockCourses = [{ id: 1, title: "Curso 1", description: "Descripción larga" }];
    CourseRepository.prototype.getAllCourses.mockResolvedValue(mockCourses);

    const res = await request(app).get("/courses");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockCourses);
  });

  test("Debe crear un nuevo curso", async () => {
    const newCourse = { title: "E2E Curso", description: "Descripción válida con la cantidad de caracteres necesarios." };
    const mockCourse = { id: 10, ...newCourse };

    CourseRepository.prototype.createCourse.mockResolvedValue(mockCourse);

    const res = await request(app).post("/courses").send(newCourse);

    expect(res.status).toBe(201);
    expect(res.body.data).toEqual(mockCourse);
    createdCourseId = res.body.data.id;
  });

  test("Debe obtener un curso por ID", async () => {
    const mockCourse = { id: 10, title: "E2E Curso", description: "Descripción válida." };
    CourseRepository.prototype.getCourseById.mockResolvedValue(mockCourse);

    const res = await request(app).get(`/courses/${mockCourse.id}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockCourse);
  });

  test("Debe eliminar un curso existente", async () => {
    CourseRepository.prototype.deleteCourse.mockResolvedValue(true);

    const res = await request(app).delete(`/courses/${createdCourseId}`);

    expect(res.status).toBe(204);
  });

  test("Debe retornar 404 si intenta eliminar un curso inexistente", async () => {
    CourseRepository.prototype.deleteCourse.mockResolvedValue(false);

    const res = await request(app).delete(`/courses/999`);

    expect(res.status).toBe(404);
    expect(res.body.detail).toBe("Course with id 999 not found");
  });
});
