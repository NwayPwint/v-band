import { useState, useEffect } from "react";
import GalleryLightbox from "../../components/GalleryLightbox";
import SocialIcon from "../../components/SocialIcon";
import { interviewApi, Interview } from "../../services/api";

const LINEUP = [
  {
    name: "RaNo",
    role: "Lead Vocals",
    image: "/images/members/rano.jpg",
    images: [
      "/images/members/rano.jpg",
      "/images/members/rano-2.jpg",
      "/images/members/rano-3.jpg",
      "/images/members/rano-4.jpg",
      "/images/members/rano-5.jpg",
    ],
    birthday: "September 22",
    bio: "RaNo (ရာနို) is a powerhouse vocalist, lyricist, and dynamic frontman who has rapidly risen to prominence within Myanmar's modern rock and alternative metal scene. Known for his incredible vocal range, intense emotional delivery, and commanding stage presence, he recently ushered in an exciting new era for Velocity as their main vocalist. Beyond his roaring vocals, RaNo is deeply dedicated to the craft of songwriting and continuous musical growth — a creative philosophy that helped shape hard-hitting projects like \"METAMORPHOSIS\". His artistry has propelled the band onto prestigious international stages, including the ROUND ASEAN-Korea Music Festival. He was formerly the vocalist of Divine Negative.",
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/18wSbUASyi/" },
      { platform: "Instagram", url: "https://www.instagram.com/hlyanhtet1662019?igsh=NjB2Mzk0eHhwamN3" },
      { platform: "Divine Negative", url: "https://www.youtube.com/@DivineNegativeOfficial" },
    ],
  },
  {
    name: "Tun Thu",
    role: "Guitars & Backing Vocals",
    image: "/images/members/tunthu.jpg",
    images: [
      "/images/members/tunthu.jpg",
      "/images/members/tunthu-2.jpg",
      "/images/members/tunthu-3.jpg",
      "/images/members/tunthu-4.jpg",
      "/images/members/tunthu-5.jpg",
    ],
    birthday: "December 25",
    bio: "Tun Thu is the lead guitarist, backing vocalist, and one of the core founding members of Velocity. Since the band's inception around 2010, he has been the primary architectural force behind its musical direction — widely recognized for complex, technical guitar work, ambient instrumentation, and unconventional progressive metal song structures. Beyond the stage, he hosts theLAB — a podcast contributing to the Myanmar Music Industry through conversations with industry professionals.",
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/1EGWxa87Wi/" },
      { platform: "Instagram", url: "https://www.instagram.com/tunthu_velocity?igsh=Nzhia3p3M3AxOGx0" },
      { platform: "theLAB", url: "https://www.youtube.com/@theLAB_mm" },
    ],
  },
  {
    name: "Aung Thu",
    role: "Drums & Backing Vocals",
    image: "/images/members/aungthu.jpg",
    images: [
      "/images/members/aungthu.jpg",
      "/images/members/aungthu-2.jpg",
      "/images/members/aungthu-3.jpg",
      "/images/members/aungthu-4.jpg",
      "/images/members/aungthu-5.jpg",
    ],
    birthday: "July 10",
    bio: "Aung Thu is the powerhouse drummer and a key founding pillar of Velocity. Instrumental to the band's driving rhythm section, he is widely respected for his high-speed double-bass drumming, lightning-fast blast beats, and mastery over complex, shifting time signatures. His relentless energy gives Velocity its heavy, progressive-metal edge. A dedicated gear enthusiast and music producer, he is an official endorsing artist for Centent Cymbals and runs Atlas Tune — his personal YouTube channel sharing his creative passions and behind-the-scenes content.",
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/17fQP7herB/" },
      { platform: "Instagram", url: "https://www.instagram.com/aung.thu15?igsh=ZG5oNm52cHJ2NDZ4" },
      { platform: "Atlas Tune", url: "https://www.youtube.com/@Aung_Thu" },
    ],
  },
  {
    name: "Chris Chen",
    role: "Keyboards",
    image: "/images/members/chrischen.png",
    images: [
      "/images/members/chrischen.png",
      "/images/members/chrischen-2.png",
      "/images/members/chrischen-3.png",
      "/images/members/chrischen-4.png",
      "/images/members/chrischen-5.png",
    ],
    birthday: "April 10",
    bio: "Chris Chen is the keyboardist and synthesizer player who crafts the deep, atmospheric layers for Velocity. He is the primary force behind the band's cinematic soundscapes — blending symphonic textures, ambient keyboards, and electronic synths into their heavy guitar riffs. Beyond Velocity, Chris is an active audio engineer and producer, exploring individual projects including electronic tracks like \"STEPPEFIRE\" and \"Eain\". His technical mastery adds a sophisticated, futuristic dimension to the band's sound.",
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/1JPjABT58w/" },
      { platform: "Instagram", url: "https://www.instagram.com/chrischen_keys?igsh=MTh3OGZhMmRibGN1dA==" },
      { platform: "YouTube", url: "https://www.youtube.com/@ChrisChen-b6i" },
    ],
  },
  {
    name: "Pyae Wa",
    role: "Bass Guitar",
    image: "/images/members/pyaewa.jpg",
    images: [
      "/images/members/pyaewa.jpg",
      "/images/members/pyaewa-2.jpg",
      "/images/members/pyaewa-3.jpg",
      "/images/members/pyaewa-4.jpg",
      "/images/members/pyaewa-5.jpg",
    ],
    birthday: "October 6",
    bio: "Pyae Wa (ပြည့်ဝ) is a prominent guitarist and a long-standing member of Velocity, playing a vital role in shaping the band's heavy sonic identity. He crafts the intricate riffs and melodic progressions that define Velocity's signature modern metal sound. Beyond Velocity, Pyae Wa is the frontman of Break The Curse — a Myanmar metal band playing Metal-core, Industrial Metal, Nu-Metal, Electronic Metal, Heavy Metal and Modern Rock.",
    socials: [
      { platform: "Facebook", url: "https://www.facebook.com/share/1E8C2dC7xn/" },
      { platform: "Instagram", url: "https://www.instagram.com/tunthu_velocity?igsh=Nzhia3p3M3AxOGx0" },
      { platform: "YouTube", url: "https://www.youtube.com/@pyaewa9695" },
      { platform: "Break The Curse", url: "https://www.youtube.com/@BreakTheCurseMM" },
    ],
  },
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
  const [gallery, setGallery] = useState<{ images: string[]; name: string } | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    interviewApi.getAll().then((res) => setInterviews(res.data));
  }, []);

  return (
    <>
      {gallery && (
        <GalleryLightbox
          images={gallery.images}
          name={gallery.name}
          onClose={() => setGallery(null)}
        />
      )}

      {/* SECTION 1: HERO */}
      <section className="about-hero section-dark">
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
              <div className="about-member-card" key={i}>
                <div
                  className="about-member-img"
                  onClick={() => setGallery({ images: member.images, name: member.name })}
                >
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="about-member-info">
                  <span className="about-member-name">{member.name}</span>
                  <span className="about-member-role">{member.role}</span>
                  <span className="about-member-birthday">Birthday: {member.birthday}</span>
                  <p className="about-member-bio">{member.bio}</p>
                  {member.socials && (
                    <div className="about-member-socials">
                      {member.socials.map((s, j) => (
                        <a key={j} href={s.url} target="_blank" rel="noopener noreferrer">
                          <SocialIcon platform={s.platform} />
                          {s.platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider">
        <span className="v-line"></span>

        <span className="v-line"></span>
      </div>

      {/* SECTION 5: INTERVIEWS */}
      <section className="section">
        <div className="section-container">
          <span className="section-label">Press</span>
          <h2 className="section-title">Interviews</h2>
          <div className="about-facts">
            {interviews.length === 0 ? (
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                No interviews added yet.
              </p>
            ) : (
              interviews.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-fact-card"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  <span className="about-fact-label">{item.source}</span>
                  <span className="about-fact-value" style={{ marginTop: "0.25rem" }}>
                    {item.title}
                  </span>
                  {item.date && (
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  )}
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      <div className="section-divider">
        <span className="v-line"></span>

        <span className="v-line"></span>
      </div>

      {/* SECTION 6: QUICK FACTS */}
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
