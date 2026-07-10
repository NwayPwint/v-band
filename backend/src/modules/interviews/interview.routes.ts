import { Router } from "express";
import { interviewController } from "./interview.controller";

export const interviewRoutes = Router();

interviewRoutes.get("/", interviewController.getAll);
interviewRoutes.get("/:id", interviewController.getById);
interviewRoutes.post("/", interviewController.create);
interviewRoutes.put("/:id", interviewController.update);
interviewRoutes.delete("/:id", interviewController.delete);
