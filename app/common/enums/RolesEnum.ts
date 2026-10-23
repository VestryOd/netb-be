/**
 * @swagger
 * components:
 *   schemas:
 *     RoleTypes:
 *       type: string
 *       enum:
 *         - user
 *         - teacher
 *         - student
 *         - admin
 */
export enum RolesEnum {
  USER = "user",
  TEACHER = "teacher",
  STUDENT = "student",
  ADMIN = "admin",
}
