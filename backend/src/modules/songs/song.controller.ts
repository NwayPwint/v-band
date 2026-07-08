import { Request, Response } from "express";
import { songService } from "./song.service";

export const songController = {
  async getAll(_req: Request, res: Response) {
    try {
      const songs = await songService.getAll();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch songs" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const song = await songService.getById(id);
      if (!song) {
        return res.status(404).json({ error: "Song not found" });
      }
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch song" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const song = await songService.create(req.body);
      res.status(201).json(song);
    } catch (error) {
      res.status(500).json({ error: "Failed to create song" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      const song = await songService.update(id, req.body);
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: "Failed to update song" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id as string);
      await songService.softDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete song" });
    }
  },
};
