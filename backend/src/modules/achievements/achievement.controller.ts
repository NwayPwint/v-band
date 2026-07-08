import { Request, Response } from "express";
import { achievementService } from "./achievement.service";

export const achievementController = {
  async getAll(_req: Request, res: Response) {
    try {
      const achievements = await achievementService.getAll();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievements" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const achievement = await achievementService.getById(id);
      if (!achievement) {
        return res.status(404).json({ error: "Achievement not found" });
      }
      res.json(achievement);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch achievement" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const achievement = await achievementService.create(req.body);
      res.status(201).json(achievement);
    } catch (error) {
      res.status(500).json({ error: "Failed to create achievement" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const achievement = await achievementService.update(id, req.body);
      res.json(achievement);
    } catch (error) {
      res.status(500).json({ error: "Failed to update achievement" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await achievementService.softDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete achievement" });
    }
  },
};
