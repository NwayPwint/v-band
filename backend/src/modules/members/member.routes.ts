import { Router } from "express";
import { memberController } from "./member.controller";

export const memberRoutes = Router();

memberRoutes.get("/", memberController.getAll);
memberRoutes.get("/:id", memberController.getById);
memberRoutes.post("/", memberController.create);
memberRoutes.put("/:id", memberController.update);
memberRoutes.delete("/:id", memberController.delete);
