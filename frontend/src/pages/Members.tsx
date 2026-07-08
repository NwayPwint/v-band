import { useEffect, useState } from "react";
import { memberApi, Member } from "../services/api";

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [form, setForm] = useState({ name: "", role: "", image_url: "", social_url: "" });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const res = await memberApi.getAll();
    setMembers(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      await memberApi.update(editingMember.id, form);
    } else {
      await memberApi.create(form);
    }
    setShowModal(false);
    setEditingMember(null);
    setForm({ name: "", role: "", image_url: "", social_url: "" });
    loadMembers();
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      role: member.role,
      image_url: member.image_url,
      social_url: member.social_url,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this member?")) {
      await memberApi.delete(id);
      loadMembers();
    }
  };

  const getRoleBadgeClass = (role: string) => {
    const lower = role.toLowerCase();
    if (lower.includes("vocal")) return "badge-vocalist";
    if (lower.includes("guitar")) return "badge-guitarist";
    if (lower.includes("drum")) return "badge-drummer";
    return "badge-default";
  };

  return (
    <div>
      <div className="page-header">
        <h2>Members</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingMember(null);
            setForm({ name: "", role: "", image_url: "", social_url: "" });
            setShowModal(true);
          }}
        >
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="empty-state">
          <p>No members yet</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Your First Member
          </button>
        </div>
      ) : (
        <div className="grid">
          {members.map((member) => (
            <div className="card" key={member.id}>
              <div className="card-header">
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  {member.image_url && (
                    <img src={member.image_url} alt={member.name} className="member-avatar" />
                  )}
                  <div>
                    <h3 style={{ fontSize: "1.1rem" }}>{member.name}</h3>
                    <span className={`badge ${getRoleBadgeClass(member.role)}`}>{member.role}</span>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="btn-icon" onClick={() => handleEdit(member)}>
                    Edit
                  </button>
                  <button className="btn-icon" onClick={() => handleDelete(member.id)}>
                    Del
                  </button>
                </div>
              </div>
              {member.social_url && (
                <a
                  href={member.social_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)", fontSize: "0.85rem" }}
                >
                  Social Link
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingMember ? "Edit Member" : "Add Member"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Social URL</label>
                <input
                  type="text"
                  value={form.social_url}
                  onChange={(e) => setForm({ ...form, social_url: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMember ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
