import { useEffect, useState } from "react";
import { eventApi, Event } from "../services/api";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form, setForm] = useState({ title: "", event_date: "", venue: "", ticket_url: "" });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await eventApi.getAll();
    setEvents(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      await eventApi.update(editingEvent.id, form);
    } else {
      await eventApi.create(form);
    }
    setShowModal(false);
    setEditingEvent(null);
    setForm({ title: "", event_date: "", venue: "", ticket_url: "" });
    loadEvents();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setForm({
      title: event.title,
      event_date: event.event_date.split("T")[0],
      venue: event.venue,
      ticket_url: event.ticket_url || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await eventApi.delete(id);
      loadEvents();
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      year: date.getFullYear(),
    };
  };

  return (
    <div>
      <div className="page-header">
        <h2>Events</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingEvent(null);
            setForm({ title: "", event_date: "", venue: "", ticket_url: "" });
            setShowModal(true);
          }}
        >
          Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <p>No events yet</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Add Your First Event
          </button>
        </div>
      ) : (
        <div className="grid">
          {events.map((event) => {
            const date = formatDate(event.event_date);
            return (
              <div className="card" key={event.id}>
                <div className="card-header">
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div className="event-date">
                      <span className="day">{date.day}</span>
                      <span className="month">{date.month}</span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.1rem" }}>{event.title}</h3>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{event.venue}</p>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button className="btn-icon" onClick={() => handleEdit(event)}>
                      Edit
                    </button>
                    <button className="btn-icon" onClick={() => handleDelete(event.id)}>
                      Del
                    </button>
                  </div>
                </div>
                {event.ticket_url && (
                  <a
                    href={event.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ display: "inline-block", marginTop: "0.5rem", fontSize: "0.8rem" }}
                  >
                    Buy Tickets
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingEvent ? "Edit Event" : "Add Event"}</h3>
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
                <label>Event Date</label>
                <input
                  type="date"
                  value={form.event_date}
                  onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input
                  type="text"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ticket URL</label>
                <input
                  type="text"
                  value={form.ticket_url}
                  onChange={(e) => setForm({ ...form, ticket_url: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
