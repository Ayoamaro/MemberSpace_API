import { Router } from "express";
import { registerController, loginController } from "./auth.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar un nuevo usuario
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usernuevo@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 */
router.post("/register", registerController);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login de usuario
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: usernuevo@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login correcto
 */
router.post("/login", loginController);

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Obtener datos del usuario autenticado
 *     responses:
 *       200:
 *         description: Usuario autenticado
 */
router.get("/me", authenticate, (req, res) => {
  return res.json({
    message: "Usuario autenticado",
    user: req.user,
  });
});

/**
 * @openapi
 * /api/v1/auth/user:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Ruta accesible por USER y ADMIN
 *     responses:
 *       200:
 *         description: Bienvenido, usuario
 */
router.get("/user", authenticate, authorize("USER", "ADMIN"), (req, res) => {
  return res.json({
    message: "Bienvenido, usuario",
    user: req.user,
  });
});

/**
 * @openapi
 * /api/v1/auth/admin:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Ruta accesible solo por ADMIN
 *     responses:
 *       200:
 *         description: Bienvenido, administrador
 */
router.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
  return res.json({
    message: "Bienvenido, administrador",
    user: req.user,
  });
});

export default router;
