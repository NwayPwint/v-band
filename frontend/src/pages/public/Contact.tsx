const BAND_INFO = {
  origin: "Yangon, Myanmar",
};

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="section-container">
          <span className="section-label">Get In Touch</span>
          <h1 className="page-hero-title">Contact</h1>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's Connect</h3>
              <p>For booking, press inquiries, or just to say hi. We'd love to hear from you.</p>
              <div className="contact-details">
                <p><strong>Email:</strong> velocity.mm.band@gmail.com</p>
                <p><strong>YouTube:</strong> @VelocityMM</p>
                <p><strong>Origin:</strong> {BAND_INFO.origin}</p>
              </div>
              <div className="contact-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.facebook.com/share/1PRrLdQAPc/" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.youtube.com/@VelocityMM" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="https://open.spotify.com/artist/29Jn9ATXvItRNxLSGVT26U" target="_blank" rel="noopener noreferrer">Spotify</a>
                <a href="https://www.tiktok.com/@ray.leigh63/video/7625163601304620308" target="_blank" rel="noopener noreferrer">TikTok</a>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={5} placeholder="Your message" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
