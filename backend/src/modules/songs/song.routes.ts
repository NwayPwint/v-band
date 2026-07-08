import { Router } from "express";
import { songController } from "./song.controller";

export const songRoutes = Router();

songRoutes.get("/", songController.getAll);
songRoutes.get("/:id", songController.getById);
songRoutes.post("/", songController.create);
songRoutes.put("/:id", songController.update);
songRoutes.delete("/:id", songController.delete);
