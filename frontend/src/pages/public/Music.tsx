import { useEffect, useState, useRef } from "react";
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
  const [embedFailed, setEmbedFailed] = useState(false);
  const failTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    songApi.getAll().then((res) => setSongs(res.data));
  }, []);

  // Detect Spotify embed failure
  useEffect(() => {
    if (failTimerRef.current) clearTimeout(failTimerRef.current);

    if (playingUrl.includes("spotify.com/embed")) {
      setEmbedFailed(false);
      failTimerRef.current = setTimeout(() => {
        setEmbedFailed(true);
      }, 5000);
    } else {
      setEmbedFailed(false);
    }

    return () => {
      if (failTimerRef.current) clearTimeout(failTimerRef.current);
    };
  }, [playingUrl]);

  const albums = songs.filter((s) => s.type === "Album").reverse();
  const singles = songs.filter((s) => s.type === "Single").reverse();

  const handlePlay = (song: Song) => {
    const url = getYouTubeEmbedUrl(song.url);
    setPlayingUrl(url);
    setPlayingTitle(song.title);
    setPlayerKey((k) => k + 1);
    setEmbedFailed(false);
  };

  return (
    <>
      <section className="section section-dark">
        <div className="section-container">
          <span className="section-label">Now Playing</span>
          <h2 className="section-title">{playingTitle}</h2>
          <div className="spotify-layout">
            <div className="spotify-embed-wrapper">
              {embedFailed ? (
                <div className="spotify-fallback">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="var(--accent)">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.19.19-.41.29-.67.29-.3 0-.58-.12-.86-.36-1.16-.93-2.49-1.39-3.99-1.39-1.56 0-2.89.46-3.99 1.39-.28.24-.56.36-.86.36-.26 0-.48-.1-.67-.29-.19-.19-.29-.41-.29-.67 0-.3.12-.58.36-.86 1.39-1.12 2.93-1.68 4.63-1.68 1.62 0 3.14.56 4.59 1.68.24.28.36.56.36.86 0 .26-.1.48-.29.67zm1.35-2.77c-.23.23-.51.35-.83.35-.34 0-.64-.14-.92-.42-1.42-1.16-3.09-1.73-5.01-1.73-1.88 0-3.54.58-4.98 1.73-.3.28-.6.42-.92.42-.32 0-.6-.12-.83-.35-.23-.23-.35-.51-.35-.83 0-.34.14-.64.42-.92 1.67-1.36 3.57-2.04 5.69-2.04 2.16 0 4.06.68 5.69 2.04.28.28.42.58.42.92 0 .32-.12.6-.35.83z"/>
                  </svg>
                  <h3>Spotify Embed Unavailable</h3>
                  <p>This content is not available in your region.</p>
                  <a
                    href={playingUrl.includes("spotify.com/embed") 
                      ? playingUrl.replace("embed/", "")
                      : "https://open.spotify.com/artist/29Jn9ATXvItRNxLSGVT26U"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-spotify"
                  >
                    Open in Spotify
                  </a>
                </div>
              ) : (
                <iframe
                  key={playerKey}
                  src={playingUrl}
                  width="100%"
                  height={playingUrl.includes("youtube.com") ? "300" : "500"}
                  allow="encrypted-media *; autoplay; fullscreen"
                />
              )}
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
