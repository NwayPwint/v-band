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
          <Link to="/" className="nav-logo"><img src="/images/band/logo.png" alt="VELOCITY" /></Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/music">Music</Link></li>
            <li><Link to="/tour">Tour</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              className="nav-hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
        <Link to="/music" onClick={() => setMobileMenuOpen(false)}>Music</Link>
        <Link to="/tour" onClick={() => setMobileMenuOpen(false)}>Tour</Link>
        <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
      </div>

      <main className="public-main">
        <Outlet />
      </main>

      <footer className="public-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>VELOCITY</h3>
            <p>Progressive Metal from Yangon, Myanmar. Known for unconventional song structures, technical guitar work, and fast double-bass drumming.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/music">Music</Link></li>
              <li><Link to="/tour">Tour</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/share/1PRrLdQAPc/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.youtube.com/@VelocityMM" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.tiktok.com/@ray.leigh63/video/7625163601304620308" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="https://open.spotify.com/artist/29Jn9ATXvItRNxLSGVT26U" target="_blank" rel="noopener noreferrer">Spotify</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} VELOCITY. All rights reserved. Est. 2010, Yangon, Myanmar.</p>
          <span className="footer-association">In association with FG Entertainment</span>
        </div>
      </footer>
    </div>
  );
}
