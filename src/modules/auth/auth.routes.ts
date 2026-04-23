import { Router } from "express";
import { registerController, loginController } from "./auth.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { sendSuccess } from "../../utils/apiResponse";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registrar un nuevo usuario
 *     security: []
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
 */
router.post("/login", loginController);

/**
 * @openapi
 * /api/v1/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Obtener datos del usuario autenticado
 */
router.get("/me", authenticate, (req, res) => {
  return sendSuccess(res, 200, "Usuario autenticado", { user: req.user });
});

/**
 * @openapi
 * /api/v1/auth/user:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Ruta accesible por USER y ADMIN
 */
router.get("/user", authenticate, authorize("USER", "ADMIN"), (req, res) => {
  return sendSuccess(res, 200, "Bienvenido, usuario", { user: req.user });
});

/**
 * @openapi
 * /api/v1/auth/admin:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Ruta accesible solo por ADMIN
 */
router.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
  return sendSuccess(res, 200, "Bienvenido, administrador", {
    user: req.user,
  });
});

export default router;
