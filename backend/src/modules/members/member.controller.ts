import { Request, Response } from "express";
import { memberService } from "./member.service";

export const memberController = {
  async getAll(_req: Request, res: Response) {
    try {
      const members = await memberService.getAll();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch members" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const member = await memberService.getById(id);
      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch member" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const member = await memberService.create(req.body);
      res.status(201).json(member);
    } catch (error) {
      res.status(500).json({ error: "Failed to create member" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const member = await memberService.update(id, req.body);
      res.json(member);
    } catch (error) {
      res.status(500).json({ error: "Failed to update member" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await memberService.softDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete member" });
    }
  },
};
