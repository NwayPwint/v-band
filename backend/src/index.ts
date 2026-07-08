import express from "express";
import cors from "cors";
import { memberRoutes } from "./modules/members/member.routes";
import { songRoutes } from "./modules/songs/song.routes";
import { eventRoutes } from "./modules/events/event.routes";
import { achievementRoutes } from "./modules/achievements/achievement.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin";
  if (password === adminPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Invalid password" });
  }
});

app.use("/api/members", memberRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/achievements", achievementRoutes);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
