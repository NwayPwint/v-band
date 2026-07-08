import { Router } from "express";
import { achievementController } from "./achievement.controller";

export const achievementRoutes = Router();

achievementRoutes.get("/", achievementController.getAll);
achievementRoutes.get("/:id", achievementController.getById);
achievementRoutes.post("/", achievementController.create);
achievementRoutes.put("/:id", achievementController.update);
achievementRoutes.delete("/:id", achievementController.delete);
