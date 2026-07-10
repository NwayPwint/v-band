import { useEffect, useState } from "react";

interface GalleryLightboxProps {
  images: string[];
  name: string;
  onClose: () => void;
}

const PLACEHOLDER = (initial: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%230F0F1A'/%3E%3Ctext x='200' y='190' text-anchor='middle' dominant-baseline='middle' fill='%236B6B8D' font-family='Oswald,sans-serif' font-size='64' letter-spacing='2'%3E${initial}%3C/text%3E%3Ctext x='200' y='230' text-anchor='middle' dominant-baseline='middle' fill='%234A4A6A' font-family='Inter,sans-serif' font-size='14'%3ENO%20PHOTO%3C/text%3E%3C/svg%3E`;

export default function GalleryLightbox({ images, name, onClose }: GalleryLightboxProps) {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleImgError = (i: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = PLACEHOLDER(name.charAt(0));
    setLoaded((prev) => ({ ...prev, [i]: true }));
  };

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <button className="gallery-close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="gallery-title">{name}</h3>
        <img
          src={images[selected]}
          alt={`${name} ${selected + 1}`}
          onError={(e) => handleImgError(selected, e)}
        />
        <div className="gallery-row">
          {images.map((src, i) => (
            <div
              className={`gallery-item${i === selected ? " active" : ""}`}
              key={i}
              onClick={() => setSelected(i)}
            >
              <img
                src={src}
                alt={`${name} ${i + 1}`}
                onError={(e) => handleImgError(i, e)}
                onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
                className={loaded[i] ? "" : "gallery-img-loading"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
