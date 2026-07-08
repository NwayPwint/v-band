import { Router } from "express";
import { eventController } from "./event.controller";

export const eventRoutes = Router();

eventRoutes.get("/", eventController.getAll);
eventRoutes.get("/:id", eventController.getById);
eventRoutes.post("/", eventController.create);
eventRoutes.put("/:id", eventController.update);
eventRoutes.delete("/:id", eventController.delete);
