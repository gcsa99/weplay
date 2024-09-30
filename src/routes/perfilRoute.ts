import { PerfilController } from "../controllers/perfilController";
import { Router } from "express";

const router = Router();

router
  .get("/perfil", PerfilController.getAllPerfil)
  .get("/perfil/:id", PerfilController.getPerfilById)
  .post("/perfil", PerfilController.createPerfil)
  .put("/perfil/:id", PerfilController.updatePerfil)
  .delete("/perfil/:id", PerfilController.deletePerfil);
export default router;
