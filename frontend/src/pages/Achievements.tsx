import { useEffect, useState } from "react";
import { achievementApi, Achievement } from "../services/api";

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [form, setForm] = useState({ title: "", description: "", icon: "", year: "" });

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const res = await achievementApi.getAll();
    setAchievements(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, year: form.year ? parseInt(form.year) : null, icon: form.icon || null };
    if (editing) {
      await achievementApi.update(editing.id, data);
    } else {
      await achievementApi.create(data as any);
    }
    setShowModal(false);
    setEditing(null);
    setForm({ title: "", description: "", icon: "", year: "" });
    loadAchievements();
  };

  const handleEdit = (item: Achievement) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon || "",
      year: item.year?.toString() || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure?")) {
      await achievementApi.delete(id);
      loadAchievements();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Achievements</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(null);
            setForm({ title: "", description: "", icon: "", year: "" });
            setShowModal(true);
          }}
        >
          Add Achievement
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="empty-state">
          <p>No achievements yet</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Your First Achievement
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Title</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {achievements.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem" }}>
                    {item.icon || "—"}
                  </td>
                  <td>
                    <div>
                      <strong>{item.title}</strong>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>
                        {item.description}
                      </p>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{item.year || "—"}</td>
                  <td>
                    <button className="btn-icon" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="btn-icon" onClick={() => handleDelete(item.id)}>Del</button>
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
            <h3>{editing ? "Edit Achievement" : "Add Achievement"}</h3>
            <form onSubmit={handleSubmit}>
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
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Icon (e.g. MM, AX)</label>
                <input
                  type="text"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
