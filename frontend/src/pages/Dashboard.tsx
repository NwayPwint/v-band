import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { memberApi, songApi, eventApi } from "../services/api";

export default function Dashboard() {
  const [memberCount, setMemberCount] = useState(0);
  const [songCount, setSongCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    memberApi.getAll().then((res) => setMemberCount(res.data.length));
    songApi.getAll().then((res) => setSongCount(res.data.length));
    eventApi.getAll().then((res) => setEventCount(res.data.length));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Members</h3>
          <div className="value">{memberCount}</div>
        </div>
        <div className="summary-card">
          <h3>Songs</h3>
          <div className="value">{songCount}</div>
        </div>
        <div className="summary-card">
          <h3>Events</h3>
          <div className="value">{eventCount}</div>
        </div>
      </div>

      <div className="grid">
        <Link to="/admin/members" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3>Members</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              Manage band members and roles
            </p>
          </div>
        </Link>
        <Link to="/admin/songs" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3>Songs</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              Manage your song repertoire
            </p>
          </div>
        </Link>
        <Link to="/admin/events" style={{ textDecoration: "none" }}>
          <div className="card">
            <h3>Events</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              Schedule and track events
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
