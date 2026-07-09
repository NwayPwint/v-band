import { useEffect, useState } from "react";
import { songApi, Song } from "../../services/api";

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

export default function Music() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playingUrl, setPlayingUrl] = useState<string>(
    "https://open.spotify.com/embed/artist/29Jn9ATXvItRNxLSGVT26U"
  );
  const [playingTitle, setPlayingTitle] = useState("Velocity");
  const [playerKey, setPlayerKey] = useState(0);

  useEffect(() => {
    songApi.getAll().then((res) => setSongs(res.data));
  }, []);

  const albums = songs.filter((s) => s.type === "Album").reverse();
  const singles = songs.filter((s) => s.type === "Single").reverse();

  const handlePlay = (song: Song) => {
    setPlayingUrl(getYouTubeEmbedUrl(song.url));
    setPlayingTitle(song.title);
    setPlayerKey((k) => k + 1);
  };

  return (
    <>
      <section className="section section-dark">
        <div className="section-container">
          <span className="section-label">Now Playing</span>
          <h2 className="section-title">{playingTitle}</h2>
          <div className="spotify-layout">
            <div className="spotify-embed-wrapper">
              <iframe
                key={playerKey}
                src={playingUrl}
                width="100%"
                height={playingUrl.includes("youtube.com") ? "300" : "500"}
                allow="encrypted-media *; autoplay; fullscreen"
              />
            </div>
            <div className="spotify-info">
              <h3>Stream on Spotify</h3>
              <p>
                Listen to our complete catalog on Spotify. Follow us for new
                releases and updates.
              </p>
              <a
                href="https://open.spotify.com/artist/29Jn9ATXvItRNxLSGVT26U"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-spotify"
              >
                Open in Spotify
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <span className="section-label">Albums</span>
          <h2 className="section-title">Albums</h2>
          <div className="albums-grid">
            {albums.map((album) => (
              <a
                href={album.url}
                target="_blank"
                rel="noopener noreferrer"
                className="album-card"
                key={album.id}
              >
                <div className="album-cover-wrapper">
                  <img src={album.cover_image} alt={album.title} />
                  {album.is_latest && (
                    <span className="badge-latest">Latest</span>
                  )}
                </div>
                <div className="album-info">
                  <h3>{album.title}</h3>
                  <span className="album-meta">
                    {new Date(album.release_date).getFullYear()} &middot;{" "}
                    {album.type}
                  </span>
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
              <a
                href={single.url}
                target="_blank"
                rel="noopener noreferrer"
                className="song-card"
                key={single.id}
              >
                <div className="song-cover-wrapper">
                  <img src={single.cover_image} alt={single.title} />
                  <div
                    className="song-play-overlay"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlePlay(single);
                    }}
                  >
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
