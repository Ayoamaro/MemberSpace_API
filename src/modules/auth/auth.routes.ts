import { Router } from "express";
import { registerController, loginController } from "./auth.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/me", authenticate, (req, res) => {
  return res.json({
    message: "Usuario autenticado",
    user: req.user,
  });
});

router.get("/admin", authenticate, authorize("ADMIN"), (req, res) => {
  return res.json({
    message: "Bienvenido, administrador",
    user: req.user,
  });
});

export default router;
