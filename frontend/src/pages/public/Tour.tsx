import { useEffect, useState } from "react";
import { eventApi, Event } from "../../services/api";

export default function Tour() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    eventApi.getAll().then((res) => setEvents(res.data));
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      year: date.getFullYear(),
    };
  };

  const now = new Date();
  const upcomingEvents = events
    .filter((e) => new Date(e.event_date) >= now)
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

  const pastEvents = events
    .filter((e) => new Date(e.event_date) < now)
    .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());

  const formatDisplayDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <>
      <section className="page-hero">
        <div className="section-container">
          <span className="section-label">Live Shows</span>
          <h1 className="page-hero-title">Tour Dates</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <span className="section-label">Upcoming</span>
          <h2 className="section-title">Upcoming Shows</h2>
          <div className="tour-list">
            {upcomingEvents.map((event) => {
              const date = formatDate(event.event_date);
              return (
                <div className="tour-item" key={event.id}>
                  <div className="tour-date">
                    <span className="tour-day">{date.day}</span>
                    <span className="tour-month">{date.month}</span>
                  </div>
                  <div className="tour-details">
                    <h3>{event.title}</h3>
                    <p>{event.venue}</p>
                  </div>
                  <div className="tour-action">
                    {event.ticket_url ? (
                      <a href={event.ticket_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Buy Tickets</a>
                    ) : (
                      <span className="tour-soon">Coming Soon</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {upcomingEvents.length === 0 && (
            <p className="empty-message">No upcoming shows. Check back soon!</p>
          )}
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-container">
          <span className="section-label">Past Performances</span>
          <h2 className="section-title">Performance History</h2>
          <div className="past-tour-list">
            {pastEvents.map((event) => (
              <div className="past-tour-item" key={event.id}>
                {event.image && (
                  <div className="past-tour-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                )}
                <div className="past-tour-content">
                  <div className="past-tour-header">
                    <span className="past-tour-type">{event.event_type}</span>
                    <span className="past-tour-date">{formatDisplayDate(event.event_date)}</span>
                  </div>
                  <h3 className="past-tour-title">{event.title}</h3>
                  <p className="past-tour-venue">{event.venue}</p>
                  {event.notes && <p className="past-tour-notes">{event.notes}</p>}
                  {event.link && (
                    <a href={event.link} target="_blank" rel="noopener noreferrer" className="past-tour-link">View Details &rarr;</a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {pastEvents.length === 0 && (
            <p className="empty-message">No past performances yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
