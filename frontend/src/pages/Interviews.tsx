import { useEffect, useState } from "react";
import { interviewApi, Interview } from "../services/api";

function getYTThumbnail(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : "";
}

export default function Interviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [form, setForm] = useState({ source: "", title: "", url: "", date: "" });

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    const res = await interviewApi.getAll();
    setInterviews(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, date: form.date || null, cover_image: getYTThumbnail(form.url) || null };
    if (editingInterview) {
      await interviewApi.update(editingInterview.id, payload);
    } else {
      await interviewApi.create(payload as any);
    }
    setShowModal(false);
    setEditingInterview(null);
    setForm({ source: "", title: "", url: "", date: "" });
    loadInterviews();
  };

  const handleEdit = (interview: Interview) => {
    setEditingInterview(interview);
    setForm({
      source: interview.source,
      title: interview.title,
      url: interview.url,
      date: interview.date ? interview.date.slice(0, 10) : "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this interview?")) {
      await interviewApi.delete(id);
      loadInterviews();
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="page-header">
        <h2>Interviews</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingInterview(null);
            setForm({ source: "", title: "", url: "", date: "" });
            setShowModal(true);
          }}
        >
          Add Interview
        </button>
      </div>

      {interviews.length === 0 ? (
        <div className="empty-state">
          <p>No interviews yet</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Your First Interview
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Source</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>
                    {interview.cover_image ? (
                      <img src={interview.cover_image} alt={interview.title} className="song-cover" />
                    ) : (
                      <div className="song-cover" style={{ background: "var(--bg-card)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                        No img
                      </div>
                    )}
                  </td>
                  <td>
                    <a
                      href={interview.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-primary)", textDecoration: "none" }}
                    >
                      {interview.title}
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-default">{interview.source}</span>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>
                    {interview.date ? formatDate(interview.date) : "—"}
                  </td>
                  <td>
                    <button className="btn-icon" onClick={() => handleEdit(interview)}>
                      Edit
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(interview.id)}>
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingInterview ? "Edit Interview" : "Add Interview"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Source</label>
                <input
                  type="text"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>YouTube URL</label>
                <input
                  type="text"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingInterview ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
