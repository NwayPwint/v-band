const LINEUP = [
  { name: "RaNo", role: "Lead Vocals" },
  { name: "Tun Thu", role: "Guitars & Backing Vocals" },
  { name: "Aung Thu", role: "Drums & Backing Vocals" },
  { name: "Chris Chen", role: "Keyboards" },
  { name: "Pyae Wa", role: "Bass Guitar" },
];

const QUICK_FACTS = [
  { label: "Founded", value: "2010 (Yangon, Myanmar)" },
  { label: "Genre", value: "Progressive Metal / Alternative Rock" },
  { label: "Breakthrough Track", value: "Metamorphosis" },
  {
    label: "Major Global Appearance",
    value: "2026 ROUND Music Festival (Philippines)",
  },
];

export default function About() {
  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="section section-dark">
        <div className="section-container">
          <span className="section-label">The Identity</span>
          <h1 className="section-title">
            Unconventional. Technical. Uncompromising.
          </h1>
          <p className="about-hero-sub">
            The Voice of Modern Myanmar Progressive Metal.
          </p>
          <p className="about-hero-body">
            Hailing from the heart of Yangon, Myanmar, Velocity is a premier
            heavy-music powerhouse pushing the boundaries of regional rock and
            metal. Established in 2010, the band has spent over a decade
            dismantling traditional musical structures to craft a sonic identity
            defined by intricate polyrhythms, complex guitar work, and
            relentless double-bass drumming. Velocity is more than a band—it is
            an ever-evolving musical experiment.
          </p>
        </div>
      </section>

      <div className="section-divider">
        <span className="v-line"></span>
      </div>

      {/* SECTION 2: EVOLUTION & SOUND */}
      <section className="section section-dark">
        <div className="section-container">
          <span className="section-label">The Journey</span>
          <h2 className="section-title">The Journey of Sound</h2>
          <div className="about-text-block">
            <p>
              Velocity exploded onto the mainstream landscape with their 2019
              debut studio album, <strong>&ldquo;Way&rdquo;</strong>, which
              shattered expectations and ranked 10th on Myanmar&rsquo;s Top 10
              Best Seller Albums list. Known for balancing technical proficiency
              with raw emotional narratives, they became pioneers in the modern
              local alternative and hard rock movements.
            </p>
            <p>
              Rather than sticking to a formula, Velocity consistently
              transforms. This constant evolution culminated in a defining new
              era with the arrival of frontman <strong>RaNo</strong>, whose
              versatile vocal range&mdash;seamlessly shifting between clean,
              haunting melodies and raw metal distortion&mdash;injected a
              blistering new energy into the band&rsquo;s catalog.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <span className="v-line"></span>

        <span className="v-line"></span>
      </div>

      {/* SECTION 3: MILESTONES & ARTISTRY */}
      <section className="section">
        <div className="section-container">
          <span className="section-label">Milestones</span>
          <h2 className="section-title">
            Pushing Boundaries, Crossing Borders
          </h2>
          <div className="about-text-block">
            <p>
              Velocity&rsquo;s artistry thrives on the philosophy of original
              creation over standard imitation. From the haunting acoustic
              reimagining of their heavy discography in the 2025 release{" "}
              <strong>&ldquo;ic Frequency&rdquo;</strong>, to the viral
              emotional resonance of their 2026 tribute single{" "}
              <strong>&ldquo;ရုတ်တရက်&rdquo; (Yoke Ta Yet)</strong>, the band
              writes with a heavy narrative purpose.
            </p>
            <p>
              Their boundary-pushing sound has caught international attention.
              Velocity proudly represented contemporary Myanmar metal on the
              global stage at the prestigious{" "}
              <strong>
                2026 ROUND Music Festival (ASEAN-Korea Music Festival)
              </strong>{" "}
              at the Araneta Coliseum in the Philippines, proving that their
              intricate sonic landscapes hold an undeniable universal appeal.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <span className="v-line"></span>

        <span className="v-line"></span>
      </div>

      {/* SECTION 4: CURRENT LINEUP */}
      <section className="section section-dark">
        <div className="section-container">
          <span className="section-label">The Band</span>
          <h2 className="section-title">The Lineup</h2>
          <div className="about-lineup">
            {LINEUP.map((member, i) => (
              <div className="about-lineup-item" key={i}>
                <span className="about-lineup-name">{member.name}</span>
                <span className="about-lineup-role">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider">
        <span className="v-line"></span>

        <span className="v-line"></span>
      </div>

      {/* SECTION 5: QUICK FACTS */}
      <section className="section">
        <div className="section-container">
          <span className="section-label">Data</span>
          <h2 className="section-title">Quick Facts</h2>
          <div className="about-facts">
            {QUICK_FACTS.map((fact, i) => (
              <div className="about-fact-card" key={i}>
                <span className="about-fact-label">{fact.label}</span>
                <span className="about-fact-value">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
