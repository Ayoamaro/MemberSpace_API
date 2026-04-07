import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import {
  getUsersController,
  getUserByIdController,
  updateUserRoleController,
  deleteUserController,
} from "./users.controller";

const router = Router();

router.use(authenticate, authorize("ADMIN"));

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 */
router.get("/", getUsersController);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 */
router.get("/:id", getUserByIdController);

/**
 * @openapi
 * /api/v1/users/{id}/role:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Actualizar el rol de un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 */
router.patch("/:id/role", updateUserRoleController);

/**
 * @openapi
 * /api/v1/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */
router.delete("/:id", deleteUserController);

export default router;
