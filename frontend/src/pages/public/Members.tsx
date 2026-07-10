import { useState, useEffect, useRef } from "react";
import GalleryLightbox from "../../components/GalleryLightbox";
import SocialIcon from "../../components/SocialIcon";
import { interviewApi, Interview } from "../../services/api";

function getYTThumbnail(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  );
  return match
    ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
    : "";
}

function drawLightning(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
) {
  ctx.clearRect(0, 0, w, h);

  const startX = Math.random() * w;
  const endX = Math.random() * w;
  const segments = 8 + Math.floor(Math.random() * 6);

  const bolt: { x: number; y: number }[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const y = t * h;
    const xOff = i === 0 || i === segments ? 0 : (Math.random() - 0.5) * w * 0.45;
    bolt.push({ x: startX + (endX - startX) * t + xOff, y });
  }

  // Glow layer
  ctx.save();
  ctx.shadowBlur = 35;
  ctx.shadowColor = "rgba(136, 187, 255, 0.7)";
  ctx.strokeStyle = "rgba(200, 220, 255, 0.5)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(bolt[0].x, bolt[0].y);
  for (let i = 1; i < bolt.length; i++) ctx.lineTo(bolt[i].x, bolt[i].y);
  ctx.stroke();
  ctx.restore();

  // Core
  ctx.save();
  ctx.shadowBlur = 20;
  ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(bolt[0].x, bolt[0].y);
  for (let i = 1; i < bolt.length; i++) ctx.lineTo(bolt[i].x, bolt[i].y);
  ctx.stroke();
  ctx.restore();

  // Branches
  const branches = 1 + Math.floor(Math.random() * 2);
  for (let b = 0; b < branches; b++) {
    const si = 1 + Math.floor(Math.random() * (bolt.length - 2));
    const { x: bx, y: by } = bolt[si];
    const dir = Math.random() < 0.5 ? -1 : 1;
    const len = 3 + Math.floor(Math.random() * 4);
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= len; i++) {
      const t = i / len;
      pts.push({
        x: bx + dir * t * w * 0.35 + (Math.random() - 0.5) * w * 0.08,
        y: by + t * (h * 0.15 + Math.random() * h * 0.05),
      });
    }
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(136, 187, 255, 0.5)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
    ctx.restore();
  }
}

const MEMBERS = [
  {
    name: "RaNo",
    role: "Lead Vocals",
    image: "/images/members/rano1.jpg",
    images: [
      "/images/members/rano1.jpg",
      "/images/members/rano2.jpg",
      "/images/members/rano3.jpg",
      "/images/members/rano4.jpg",
      "/images/members/rano5.jpg",
    ],
    birthday: "September 22",
    bio: 'RaNo is a powerhouse vocalist, lyricist, and dynamic frontman who has rapidly risen to prominence within Myanmar\'s modern rock and alternative metal scene. Known for his incredible vocal range, intense emotional delivery, and commanding stage presence, he recently ushered in an exciting new era for Velocity as their main vocalist. Beyond his roaring vocals, RaNo is deeply dedicated to the craft of songwriting and continuous musical growth — a creative philosophy that helped shape hard-hitting projects like "METAMORPHOSIS". His artistry has propelled the band onto prestigious international stages, including the ROUND ASEAN-Korea Music Festival. He was formerly the vocalist of Divine Negative.',
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/share/18wSbUASyi/",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/hlyanhtet1662019?igsh=NjB2Mzk0eHhwamN3",
      },
      {
        platform: "Divine Negative",
        url: "https://www.youtube.com/@DivineNegativeOfficial",
      },
    ],
  },
  {
    name: "Tun Thu",
    role: "Guitars & Backing Vocals",
    image: "/images/members/tunthu.jpg",
    images: [
      "/images/members/tunthu.jpg",
      "/images/members/tunthu1.jpg",
      "/images/members/tunthu2.jpg",
      "/images/members/tunthu3.jpg",
      "/images/members/tunthu4.jpg",
    ],
    birthday: "December 25",
    bio: "Tun Thu is the lead guitarist, backing vocalist, and one of the core founding members of Velocity. Since the band's inception around 2010, he has been the primary architectural force behind its musical direction — widely recognized for complex, technical guitar work, ambient instrumentation, and unconventional progressive metal song structures. Beyond the stage, he hosts theLAB — a podcast contributing to the Myanmar Music Industry through conversations with industry professionals.",
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/share/1EGWxa87Wi/",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/tunthu_velocity?igsh=Nzhia3p3M3AxOGx0",
      },
      {
        platform: "theLAB",
        url: "https://www.youtube.com/@theLAB_mm",
      },
    ],
  },
  {
    name: "Aung Thu",
    role: "Drums & Backing Vocals",
    image: "/images/members/aungthu.jpg",
    images: [
      "/images/members/aungthu.jpg",
      "/images/members/aungthu1.jpg",
      "/images/members/aungthu2.jpg",
      "/images/members/aungthu3.jpg",
      "/images/members/aungthu4.jpg",
    ],
    birthday: "July 10",
    bio: "Aung Thu is the powerhouse drummer and a key founding pillar of Velocity. Instrumental to the band's driving rhythm section, he is widely respected for his high-speed double-bass drumming, lightning-fast blast beats, and mastery over complex, shifting time signatures. His relentless energy gives Velocity its heavy, progressive-metal edge. A dedicated gear enthusiast and music producer, he is an official endorsing artist for Centent Cymbals and runs Atlas Tune — his personal YouTube channel sharing his creative passions and behind-the-scenes content.",
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/share/17fQP7herB/",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/aung.thu15?igsh=ZG5oNm52cHJ2NDZ4",
      },
      {
        platform: "Atlas Tune",
        url: "https://www.youtube.com/@Aung_Thu",
      },
    ],
  },
  {
    name: "Chris Chen",
    role: "Keyboards",
    image: "/images/members/chrischen.png",
    images: [
      "/images/members/chrischen.png",
      "/images/members/chrischen1.jpg",
      "/images/members/chrischen2.jpg",
      "/images/members/chrischen3.jpg",
      "/images/members/chrischen4.jpg",
    ],
    birthday: "April 10",
    bio: 'Chris Chen is the keyboardist and synthesizer player who crafts the deep, atmospheric layers for Velocity. He is the primary force behind the band\'s cinematic soundscapes — blending symphonic textures, ambient keyboards, and electronic synths into their heavy guitar riffs. Beyond Velocity, Chris is an active audio engineer and producer, exploring individual projects including electronic tracks like "STEPPEFIRE" and "Eain". His technical mastery adds a sophisticated, futuristic dimension to the band\'s sound.',
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/share/1JPjABT58w/",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/chrischen_keys?igsh=MTh3OGZhMmRibGN1dA==",
      },
      {
        platform: "YouTube",
        url: "https://www.youtube.com/@ChrisChen-b6i",
      },
    ],
  },
  {
    name: "Pyae Wa",
    role: "Bass Guitar",
    image: "/images/members/pyaewa.jpg",
    images: [
      "/images/members/pyaewa.jpg",
      "/images/members/pyaewa1.jpg",
      "/images/members/pyaewa2.jpg",
      "/images/members/pyaewa3.jpg",
      "/images/members/pyaewa4.jpg",
    ],
    birthday: "October 6",
    bio: "Pyae Wa is a prominent guitarist and a long-standing member of Velocity, playing a vital role in shaping the band's heavy sonic identity. He crafts the intricate riffs and melodic progressions that define Velocity's signature modern metal sound. Beyond Velocity, Pyae Wa is the frontman of Break The Curse — a Myanmar metal band playing Metal-core, Industrial Metal, Nu-Metal, Electronic Metal, Heavy Metal and Modern Rock.",
    socials: [
      {
        platform: "Facebook",
        url: "https://www.facebook.com/share/1E8C2dC7xn/",
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/tunthu_velocity?igsh=Nzhia3p3M3AxOGx0",
      },
      {
        platform: "YouTube",
        url: "https://www.youtube.com/@pyaewa9695",
      },
      {
        platform: "Break The Curse",
        url: "https://www.youtube.com/@BreakTheCurseMM",
      },
    ],
  },
];

const BAND_SOCIALS = [
  { platform: "Instagram", url: "https://instagram.com" },
  { platform: "Facebook", url: "https://www.facebook.com/share/1PRrLdQAPc/" },
  { platform: "YouTube", url: "https://www.youtube.com/@VelocityMM" },
  {
    platform: "Spotify",
    url: "https://open.spotify.com/artist/29Jn9ATXvItRNxLSGVT26U",
  },
  {
    platform: "TikTok",
    url: "https://www.tiktok.com/@ray.leigh63/video/7625163601304620308",
  },
  {
    platform: "Apple Music",
    url: "https://music.apple.com/mm/artist/velocity/1631323714",
  },
];

export default function Members() {
  const [gallery, setGallery] = useState<{
    images: string[];
    name: string;
  } | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    interviewApi.getAll().then((res) => setInterviews(res.data));
  }, []);

  const noiseRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const N = () => noiseRef.current;

    const apply = (n?: Partial<CSSStyleDeclaration>) => {
      if (N()) Object.assign(N()!.style, n ?? {});
    };

    const effects = [
      () => apply({ opacity: "0.15" }),
      () => apply({ opacity: "0.2" }),
      () => apply({ opacity: "0.1" }),
      () => apply({ opacity: "0.3" }),
      () => apply({ opacity: "0" }),
    ];

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(
        () => {
          const burst = 60 + Math.random() * 200;
          const isStutter = Math.random() < 0.25;
          effects[Math.floor(Math.random() * effects.length)]();
          setTimeout(() => {
            apply({ opacity: "0" });
            if (isStutter) {
              setTimeout(
                () => {
                  effects[Math.floor(Math.random() * effects.length)]();
                  setTimeout(
                    () => {
                      apply({ opacity: "0" });
                      schedule();
                    },
                    40 + Math.random() * 100,
                  );
                },
                30 + Math.random() * 60,
              );
            } else {
              schedule();
            }
          }, burst);
        },
        500 + Math.random() * 1500,
      );
    };
    schedule();
    return () => {
      clearTimeout(timer);
      apply({ opacity: "0" });
    };
  }, []);

  useEffect(() => {
    const H = () => heroRef.current;
    const C = () => canvasRef.current;
    const N = () => noiseRef.current;

    const positions = [
      "0% 25%", "15% 28%", "30% 22%", "50% 30%",
      "65% 26%", "80% 32%", "95% 28%", "100% 30%",
    ];

    function flash() {
      const c = C();
      if (!c) return;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      c.width = c.clientWidth;
      c.height = c.clientHeight;
      drawLightning(ctx, c.width, c.height);
      setTimeout(() => ctx.clearRect(0, 0, c.width, c.height), 80 + Math.random() * 80);
    }

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        const pos = positions[Math.floor(Math.random() * positions.length)];
        const isStutter = Math.random() < 0.3;

        if (H()) H()!.style.backgroundPosition = pos;
        flash();
        if (N()) N()!.style.opacity = (0.1 + Math.random() * 0.25).toString();

        if (isStutter) {
          setTimeout(() => {
            const pos2 = positions[Math.floor(Math.random() * positions.length)];
            if (H()) H()!.style.backgroundPosition = pos2;
            flash();
            if (N()) N()!.style.opacity = (0.15 + Math.random() * 0.3).toString();
            setTimeout(() => schedule(), 200 + Math.random() * 300);
          }, 120 + Math.random() * 200);
        } else {
          schedule();
        }
      }, 1500 + Math.random() * 3500);
    };
    schedule();
    return () => clearTimeout(timer);
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

      <section ref={heroRef} className="page-hero">
        <div className="hero-bg">
          <div className="hero-glitch-container">
            <div ref={noiseRef} className="hero-glitch__noise" />
          </div>
          <canvas ref={canvasRef} className="hero-thunder" />
        </div>
        <div className="section-container">
          <div className="page-hero-side">
            <span className="section-label">Connect</span>
            <h1 className="page-hero-title">Members</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <p className="explore-intro">
            Follow each member of Velocity and keep up with their individual
            journeys.
          </p>
          <div className="explore-members-grid">
            {MEMBERS.map((member, i) => (
              <div className="explore-member-card" key={i}>
                <div
                  className="explore-member-img"
                  onClick={() =>
                    setGallery({ images: member.images, name: member.name })
                  }
                >
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="explore-member-info">
                  <h3>{member.name}</h3>
                  <span className="explore-member-role">{member.role}</span>
                  <span className="explore-member-birthday">
                    {" "}
                    Birthday: {member.birthday}
                  </span>
                  <p className="explore-member-bio">{member.bio}</p>
                  <div className="explore-member-socials">
                    {member.socials.map((s, j) => (
                      <a
                        key={j}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon platform={s.platform} />
                        {s.platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-container">
          <span className="section-label">Follow the Band</span>
          <h2 className="section-title">Velocity Online</h2>
          <div className="explore-band-socials">
            {BAND_SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="explore-band-social-link"
              >
                <SocialIcon platform={s.platform} />
                {s.platform}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider">
        <span className="v-line"></span>
        <span className="v-line"></span>
      </div>

      {/* INTERVIEWS */}
      <section className="section">
        <div className="section-container">
          <span className="section-label">Press</span>
          <h2 className="section-title">Interviews</h2>
          {interviews.length === 0 ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              No interviews added yet.
            </p>
          ) : (
            <div className="explore-interviews-grid">
              {interviews.map((item) => {
                const thumb = item.cover_image || getYTThumbnail(item.url);
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explore-interview-card"
                  >
                    {thumb && (
                      <div className="explore-interview-thumb">
                        <img src={thumb} alt={item.title} />
                        <div className="explore-interview-play">
                          <div className="play-icon">&#9654;</div>
                        </div>
                      </div>
                    )}
                    <div className="explore-interview-info">
                      <span className="explore-interview-source">
                        {item.source}
                      </span>
                      <h3 className="explore-interview-title">{item.title}</h3>
                      {item.date && (
                        <span className="explore-interview-date">
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
