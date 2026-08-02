import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { songApi, achievementApi, Song, Achievement } from "../../services/api";
import useScrollReveal from "../../hooks/useScrollReveal";
import useTilt from "../../hooks/useTilt";
import useTextScramble from "../../hooks/useTextScramble";

const BAND_INFO = {
  name: "VELOCITY",
  origin: "Yangon, Myanmar",
  formed: 2010,
  genre: "Progressive Metal / Modern Metal",
  description:
    "Progressive Metal from Yangon, Myanmar. Known for unconventional song structures, technical guitar work, and fast double-bass drumming.",
};

const MEMBERS = [
  {
    id: 1,
    name: "RaNo",
    role: "Lead Vocals",
    image: "/images/members/rano.jpg",
    social: "#",
  },
  {
    id: 2,
    name: "Tun Thu",
    role: "Guitars & Backing Vocals",
    image: "/images/members/tunthu.jpg",
    social: "#",
  },
  {
    id: 3,
    name: "Aung Thu",
    role: "Drums & Backing Vocals",
    image: "/images/members/aungthu.jpg",
    social: "#",
  },
  {
    id: 4,
    name: "Chris Chen",
    role: "Keyboards",
    image: "/images/members/chrischen.png",
    social: "#",
  },
  {
    id: 5,
    name: "Pyae Wa",
    role: "Bass Guitar",
    image: "/images/members/pyaewa.jpg",
    social: "#",
  },
];

function MemberCard({ member }: { member: typeof MEMBERS[0]; index: number }) {
  const tiltRef = useTilt(12);
  return (
    <div
      ref={tiltRef}
      className="member-card-public tilt-card"
    >
      <div className="member-image-wrapper">
        <img src={member.image} alt={member.name} />
      </div>
      <h3>{member.name}</h3>
      <span className="member-role">{member.role}</span>
    </div>
  );
}

function AchievementCard({ item }: { item: Achievement; index: number }) {
  const tiltRef = useTilt(10);
  return (
    <div
      ref={tiltRef}
      className="achievement-card tilt-card"
    >
      <div className="achievement-icon">{item.icon || "★"}</div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isMuted, setIsMuted] = useState(true);

  const baseRef = useRef<HTMLVideoElement>(null);
  const redRef = useRef<HTMLVideoElement>(null);
  const blueRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const textRedRef = useRef<HTMLSpanElement>(null);
  const textBlueRef = useRef<HTMLSpanElement>(null);

  const latestImageRef = useScrollReveal();
  const latestContentRef = useScrollReveal();
  const bandTitleRef = useScrollReveal();
  const membersGridRef = useScrollReveal();
  const achievementsTitleRef = useScrollReveal();
  const achievementsGridRef = useScrollReveal();

  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useTextScramble(BAND_INFO.name);

  useEffect(() => {
    songApi.getAll().then((res) => setSongs(res.data));
    achievementApi.getAll().then((res) => setAchievements(res.data));
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroContent = heroContentRef.current;
      if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
        heroContent.style.opacity = `${1 - scrollY / (window.innerHeight * 0.8)}`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const R = () => redRef.current;
    const B = () => blueRef.current;
    const N = () => noiseRef.current;
    const TR = () => textRedRef.current;
    const TB = () => textBlueRef.current;

    const apply = (
      r?: Partial<CSSStyleDeclaration>,
      b?: Partial<CSSStyleDeclaration>,
      n?: Partial<CSSStyleDeclaration>,
      tr?: Partial<CSSStyleDeclaration>,
      tb?: Partial<CSSStyleDeclaration>,
    ) => {
      if (R()) Object.assign(R()!.style, r);
      if (B()) Object.assign(B()!.style, b);
      if (N()) Object.assign(N()!.style, n);
      if (TR()) Object.assign(TR()!.style, tr);
      if (TB()) Object.assign(TB()!.style, tb);
    };

    const effects = [
      () =>
        apply(
          {
            opacity: "0.3",
            transform: "translate(28px, 0)",
            clipPath: "inset(0 0 0 0)",
          },
          {
            opacity: "0.25",
            transform: "translate(-20px, 0)",
            clipPath: "inset(0 0 0 0)",
          },
          undefined,
          { opacity: "0.5", transform: "translate(6px, 0)" },
          { opacity: "0.5", transform: "translate(-4px, 0)" },
        ),
      () =>
        apply(
          {
            opacity: "0.35",
            transform: "translate(22px, 0)",
            clipPath: "inset(33% 0 33% 0)",
          },
          {
            opacity: "0.35",
            transform: "translate(-18px, 0)",
            clipPath: "inset(33% 0 33% 0)",
          },
          undefined,
          { opacity: "0.6", transform: "translate(5px, 0)" },
          { opacity: "0.6", transform: "translate(-3px, 0)" },
        ),
      () =>
        apply(
          {
            opacity: "0.25",
            transform: "translate(-15px, 6px) skewX(3deg)",
            clipPath: "inset(10% 0 20% 0)",
          },
          {
            opacity: "0.25",
            transform: "translate(18px, -4px) skewX(-2deg)",
            clipPath: "inset(15% 0 10% 0)",
          },
          { opacity: "0.15" },
          { opacity: "0.45", transform: "translate(-4px, 2px) skewX(2deg)" },
          { opacity: "0.45", transform: "translate(4px, -1px) skewX(-1deg)" },
        ),
      () =>
        apply(
          {
            opacity: "0.3",
            transform: "translate(32px, 3px) scaleX(1.03)",
            clipPath: "inset(0 0 0 0)",
          },
          {
            opacity: "0.3",
            transform: "translate(-12px, -5px)",
            clipPath: "inset(0 0 0 0)",
          },
          { opacity: "0.2" },
          { opacity: "0.5", transform: "translate(7px, 0)" },
          { opacity: "0.5", transform: "translate(-3px, 0)" },
        ),
      () =>
        apply(
          {
            opacity: "0.3",
            transform: "translate(24px, 0)",
            clipPath: "inset(0 0 60% 0)",
          },
          {
            opacity: "0.3",
            transform: "translate(-18px, 0)",
            clipPath: "inset(60% 0 0 0)",
          },
          undefined,
          { opacity: "0.55", transform: "translate(5px, 0)" },
          { opacity: "0.55", transform: "translate(-5px, 0)" },
        ),
      () =>
        apply(
          {
            opacity: "0.25",
            transform: "translate(18px, 10px) rotate(1deg)",
            clipPath: "inset(20% 0 40% 0)",
          },
          {
            opacity: "0.25",
            transform: "translate(-22px, -6px) rotate(-0.5deg)",
            clipPath: "inset(45% 0 5% 0)",
          },
          { opacity: "0.2" },
          { opacity: "0.5", transform: "translate(6px, 2px) rotate(0.5deg)" },
          {
            opacity: "0.5",
            transform: "translate(-4px, -1px) rotate(-0.3deg)",
          },
        ),
      () =>
        apply(
          {
            opacity: "0",
            transform: "translate(0, 0)",
            clipPath: "inset(0 0 0 0)",
          },
          {
            opacity: "0",
            transform: "translate(0, 0)",
            clipPath: "inset(0 0 0 0)",
          },
          { opacity: "0.3" },
          { opacity: "0.4", transform: "translate(4px, 0)" },
          { opacity: "0.4", transform: "translate(-3px, 0)" },
        ),
    ];

    const clearAll = () => {
      apply(
        { opacity: "0", transform: "", clipPath: "" },
        { opacity: "0", transform: "", clipPath: "" },
        { opacity: "0" },
        { opacity: "0", transform: "" },
        { opacity: "0", transform: "" },
      );
    };

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(
        () => {
          const burst = 60 + Math.random() * 200;
          const isStutter = Math.random() < 0.25;
          effects[Math.floor(Math.random() * effects.length)]();
          setTimeout(() => {
            clearAll();
            if (isStutter) {
              setTimeout(
                () => {
                  effects[Math.floor(Math.random() * effects.length)]();
                  setTimeout(
                    () => {
                      clearAll();
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
      clearAll();
    };
  }, []);

  const albums = songs.filter((s) => s.type === "Album").reverse();
  const latestAlbum =
    albums.find((a) => a.is_latest) || albums[albums.length - 1];

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      if (newMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="rock-texture">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-glitch-container">
            <video ref={baseRef} className="hero-glitch__base" autoPlay loop muted playsInline>
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <video ref={redRef} className="hero-glitch__red" autoPlay loop muted playsInline>
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <video ref={blueRef} className="hero-glitch__blue" autoPlay loop muted playsInline>
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div ref={noiseRef} className="hero-glitch__noise" />
          </div>
        </div>
        <div className="hero-grain" />
        <div className="hero-speed-lines" />
        <div className="hero-content" ref={heroContentRef}>
          <span className="btn btn-secondary btn-lg">
            Est. {BAND_INFO.formed}
          </span>
          <div className="hero-title-container">
            <h1 className="hero-title text-scramble" ref={scrambleRef}>{BAND_INFO.name}</h1>
            <span
              ref={textRedRef}
              className="hero-title-glitch hero-title-glitch--red"
              aria-hidden="true"
            >
              {BAND_INFO.name}
            </span>
            <span
              ref={textBlueRef}
              className="hero-title-glitch hero-title-glitch--blue"
              aria-hidden="true"
            >
              {BAND_INFO.name}
            </span>
          </div>
          <div className="hero-actions">
            <Link to="/music" className="btn btn-primary btn-lg">
              Listen Now
            </Link>
            <Link to="/tour" className="btn btn-secondary btn-lg">
              Tour Dates
            </Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        <button
          className="hero-sound-toggle"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </section>
      <audio ref={audioRef} loop>
        <source src="/videos/background.mp3" type="audio/mpeg" />
      </audio>

      {/* LATEST UPDATE */}
      <section className="latest-update">
        <div className="update-card">
          <div ref={latestImageRef} className="reveal update-image">
            <img
              src={latestAlbum?.cover_image || "/images/albums/placeholder.svg"}
              alt={latestAlbum?.title || "Latest Release"}
            />
            <span className="badge-out-now">New Album</span>
          </div>
          <div ref={latestContentRef} className="reveal reveal-delay-2 update-content">
            <span className="update-label">Latest Release</span>
            <h2>{latestAlbum?.title || "No releases yet"}</h2>
            <p className="update-date">
              {latestAlbum
                ? `${new Date(latestAlbum.release_date).getFullYear()} &middot; ${latestAlbum.type}`
                : ""}
            </p>
            <div className="update-actions">
              <a href={latestAlbum?.url || "#"} className="btn btn-primary">
                Stream Now
              </a>
              <Link to="/music" className="btn btn-secondary">
                View All Music
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE BAND */}
      <section className="section section-dark">
        <div className="section-container">
          <div ref={bandTitleRef} className="reveal">
            <span className="section-label">{BAND_INFO.genre}</span>
            <h2 className="section-title">The Band</h2>
          </div>
          <div ref={membersGridRef} className="members-grid">
            {MEMBERS.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="section section-dark">
        <div className="section-container">
          <div ref={achievementsTitleRef} className="reveal">
            <span className="section-label">Recognition</span>
            <h2 className="section-title">Achievements</h2>
          </div>
          <div ref={achievementsGridRef} className="achievements-grid">
            {achievements.map((item, i) => (
              <AchievementCard key={item.id} item={item} index={i} />
            ))}
          </div>
          {achievements.length === 0 && (
            <p className="empty-message">No achievements listed yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
