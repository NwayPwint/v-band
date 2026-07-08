import { useEffect, useState } from "react";
import { songApi, Song } from "../../services/api";

export default function Music() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    songApi.getAll().then((res) => setSongs(res.data));
  }, []);

  const albums = songs.filter((s) => s.type === "Album").reverse();
  const singles = songs.filter((s) => s.type === "Single").reverse();

  return (
    <>
      <section className="page-hero">
        <div className="section-container">
          <span className="section-label">Discography</span>
          <h1 className="page-hero-title">Music</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <span className="section-label">Albums</span>
          <h2 className="section-title">Albums</h2>
          <div className="albums-grid">
            {albums.map((album) => (
              <a href={album.url} target="_blank" rel="noopener noreferrer" className="album-card" key={album.id}>
                <div className="album-cover-wrapper">
                  <img src={album.cover_image} alt={album.title} />
                  {album.is_latest && <span className="badge-latest">Latest</span>}
                </div>
                <div className="album-info">
                  <h3>{album.title}</h3>
                  <span className="album-meta">{new Date(album.release_date).getFullYear()} &middot; {album.type}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-container">
          <span className="section-label">Singles & EPs</span>
          <h2 className="section-title">Releases</h2>
          <div className="songs-grid">
            {singles.map((single) => (
              <a href={single.url} target="_blank" rel="noopener noreferrer" className="song-card" key={single.id}>
                <div className="song-cover-wrapper">
                  <img src={single.cover_image} alt={single.title} />
                  <div className="song-play-overlay">
                    <div className="play-icon">&#9654;</div>
                  </div>
                </div>
                <div className="song-info">
                  <h3>{single.title}</h3>
                  <p>{new Date(single.release_date).getFullYear()}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
