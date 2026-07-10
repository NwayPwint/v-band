import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function PublicLayout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="public-layout">
      <nav className={`public-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/images/band/logo.png" alt="VELOCITY" />
          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/music">Music</Link>
            </li>
            <li>
              <Link to="/tour">Tour</Link>
            </li>
            <li>
              <Link to="/members">Members</Link>
            </li>
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              className="nav-hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav-overlay ${mobileMenuOpen ? "open" : ""}`}>
        <button
          className="mobile-nav-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>
          Home
        </Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
          About
        </Link>
        <Link to="/music" onClick={() => setMobileMenuOpen(false)}>
          Music
        </Link>
        <Link to="/tour" onClick={() => setMobileMenuOpen(false)}>
          Tour
        </Link>
        <Link to="/members" onClick={() => setMobileMenuOpen(false)}>
          Members
        </Link>
      </div>

      <main className="public-main">
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>VELOCITY</h3>
            <p>
              Progressive Metal from Yangon, Myanmar. Known for unconventional
              song structures, technical guitar work, and fast double-bass
              drumming.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/music">Music</Link>
              </li>
              <li>
                <Link to="/tour">Tour</Link>
              </li>
              <li>
              <Link to="/members">Members</Link>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1PRrLdQAPc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </a>
              <a
                href="https://www.youtube.com/@VelocityMM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  <path d="M19.07 4.93a10 10 0 1 0-14.14 14.14 10 10 0 0 0 14.14-14.14zM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
                YouTube
              </a>
              <a
                href="https://www.tiktok.com/@velocity_officialvibe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.57 2.5 2.57 2.57 0 0 1-2.57-2.5 2.58 2.58 0 0 1 2.57-2.5c.24 0 .47.04.7.1v-3.1a5.64 5.64 0 0 0-.7-.05A5.68 5.68 0 0 0 4 17.19a5.67 5.67 0 0 0 5.67 5.57 5.68 5.68 0 0 0 5.68-5.57v-6.5c.6.39 1.3.67 2.05.81v-3.1c-.44-.1-.84-.29-1.2-.55z" />
                </svg>
                TikTok
              </a>
              <a
                href="https://open.spotify.com/artist/29Jn9ATXvItRNxLSGVT26U"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.41c-.19.19-.41.29-.67.29-.3 0-.58-.12-.86-.36-1.16-.93-2.49-1.39-3.99-1.39-1.56 0-2.89.46-3.99 1.39-.28.24-.56.36-.86.36-.26 0-.48-.1-.67-.29-.19-.19-.29-.41-.29-.67 0-.3.12-.58.36-.86 1.39-1.12 2.93-1.68 4.63-1.68 1.62 0 3.14.56 4.59 1.68.24.28.36.56.36.86 0 .26-.1.48-.29.67zm1.35-2.77c-.23.23-.51.35-.83.35-.34 0-.64-.14-.92-.42-1.42-1.16-3.09-1.73-5.01-1.73-1.88 0-3.54.58-4.98 1.73-.3.28-.6.42-.92.42-.32 0-.6-.12-.83-.35-.23-.23-.35-.51-.35-.83 0-.34.14-.64.42-.92 1.67-1.36 3.57-2.04 5.69-2.04 2.16 0 4.06.68 5.69 2.04.28.28.42.58.42.92 0 .32-.12.6-.35.83z" />
                </svg>
                Spotify
              </a>
              <a
                href="https://music.apple.com/mm/artist/velocity/1631323714"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.02 12.67c-.15.42-.55.6-.96.46l-5.08-1.49c-.41-.14-.65-.55-.5-.97.15-.42.55-.6.96-.46l5.08 1.49c.41.14.65.55.5.97zm.64-2.48c-.17.48-.63.69-1.11.52L8.1 10.47c-.48-.17-.75-.65-.58-1.13.17-.48.63-.69 1.11-.52l6.55 2.18c.48.17.75.65.58 1.13zm.07-2.59c-.19.54-.71.77-1.25.58l-5.87-1.95c-.54-.19-.83-.72-.64-1.26.19-.54.71-.77 1.25-.58l5.87 1.95c.54.19.83.72.64 1.26z" />
                </svg>
                Apple Music
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} VELOCITY. All rights reserved.
            Est. 2010, Yangon, Myanmar.
          </p>
          <p className="footer-disclaimer">
            This is a fan-made website and is not affiliated with Velocity band.
            All links and content belong to their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
