import { useEffect, useState } from "react";
import { songApi, Song } from "../services/api";

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [form, setForm] = useState({ title: "", release_date: "", url: "", cover_image: "", type: "Single", is_latest: false });

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    const res = await songApi.getAll();
    setSongs(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSong) {
      await songApi.update(editingSong.id, form);
    } else {
      await songApi.create(form);
    }
    setShowModal(false);
    setEditingSong(null);
    setForm({ title: "", release_date: "", url: "", cover_image: "", type: "Single", is_latest: false });
    loadSongs();
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setForm({
      title: song.title,
      release_date: song.release_date.split("T")[0],
      url: song.url,
      cover_image: song.cover_image,
      type: song.type,
      is_latest: song.is_latest,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this song?")) {
      await songApi.delete(id);
      loadSongs();
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
        <h2>Songs</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingSong(null);
            setForm({ title: "", release_date: "", url: "", cover_image: "", type: "Single", is_latest: false });
            setShowModal(true);
          }}
        >
          Add Song
        </button>
      </div>

      {songs.length === 0 ? (
        <div className="empty-state">
          <p>No songs yet</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Your First Song
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Type</th>
                <th>Release Date</th>
                <th>Latest</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td>
                    {song.cover_image && (
                      <img src={song.cover_image} alt={song.title} className="song-cover" />
                    )}
                  </td>
                  <td>
                    <a
                      href={song.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-primary)", textDecoration: "none" }}
                    >
                      {song.title}
                    </a>
                  </td>
                  <td>
                    <span className={`badge ${song.type === "Album" ? "badge-default" : "badge-default"}`}>
                      {song.type}
                    </span>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{formatDate(song.release_date)}</td>
                  <td>{song.is_latest ? "✓" : ""}</td>
                  <td>
                    <button className="btn-icon" onClick={() => handleEdit(song)}>
                      Edit
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(song.id)}>
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
            <h3>{editingSong ? "Edit Song" : "Add Song"}</h3>
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
                <label>Release Date</label>
                <input
                  type="date"
                  value={form.release_date}
                  onChange={(e) => setForm({ ...form, release_date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>URL</label>
                <input
                  type="text"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cover Image URL</label>
                <input
                  type="text"
                  value={form.cover_image}
                  onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  required
                >
                  <option value="Single">Single</option>
                  <option value="Album">Album</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={form.is_latest}
                    onChange={(e) => setForm({ ...form, is_latest: e.target.checked })}
                  />
                  {" "}Latest Release
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSong ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
