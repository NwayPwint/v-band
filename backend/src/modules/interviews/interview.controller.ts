import { Request, Response } from "express";
import { interviewService } from "./interview.service";

export const interviewController = {
  async getAll(_req: Request, res: Response) {
    try {
      const interviews = await interviewService.getAll();
      res.json(interviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch interviews" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const interview = await interviewService.getById(id);
      if (!interview) {
        return res.status(404).json({ error: "Interview not found" });
      }
      res.json(interview);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch interview" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const interview = await interviewService.create(req.body);
      res.status(201).json(interview);
    } catch (error) {
      res.status(500).json({ error: "Failed to create interview" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const interview = await interviewService.update(id, req.body);
      res.json(interview);
    } catch (error) {
      res.status(500).json({ error: "Failed to update interview" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      await interviewService.softDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete interview" });
    }
  },
};
