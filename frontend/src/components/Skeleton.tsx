interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
  width?: string;
}

export function Skeleton({ className = "", style, width }: SkeletonProps) {
  return <div className={`skeleton ${className}`} style={{ ...style, width }} />;
}

export function SkeletonText({ width = "60%" }: { width?: string }) {
  return <div className="skeleton skeleton-text" style={{ width }} />;
}

export function SkeletonCircle({ size = 48 }: { size?: number }) {
  return (
    <div
      className="skeleton skeleton-circle"
      style={{ width: size, height: size }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton className="skeleton-card-image" />
      <div className="skeleton-card-body">
        <SkeletonText width="70%" />
        <SkeletonText width="40%" />
      </div>
    </div>
  );
}

export function SkeletonAlbumCard() {
  return (
    <div className="skeleton-card">
      <Skeleton className="skeleton-card-image" />
      <div className="skeleton-card-body">
        <SkeletonText width="80%" />
        <SkeletonText width="30%" />
      </div>
    </div>
  );
}

export function SkeletonMemberCard() {
  return (
    <div className="skeleton-member-card">
      <SkeletonCircle size={180} />
      <SkeletonText width="60%" />
      <SkeletonText width="40%" />
    </div>
  );
}

export function SkeletonTourRow() {
  return (
    <div className="skeleton-tour-row">
      <div className="skeleton-tour-date">
        <Skeleton width="50px" style={{ height: "2rem" }} />
        <SkeletonText width="30px" />
      </div>
      <div className="skeleton-tour-info">
        <SkeletonText width="70%" />
        <SkeletonText width="50%" />
      </div>
      <Skeleton width="120px" style={{ height: "36px" }} />
    </div>
  );
}

export function SkeletonSection({
  type = "grid",
  count = 4,
}: {
  type?: "grid" | "list" | "album-grid";
  count?: number;
}) {
  return (
    <section className="section section-dark">
      <div className="section-container">
        <div className="skeleton-header">
          <SkeletonText width="120px" />
          <SkeletonText width="200px" />
        </div>
        {type === "grid" && (
          <div className="members-grid">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonMemberCard key={i} />
            ))}
          </div>
        )}
        {type === "album-grid" && (
          <div className="albums-grid">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonAlbumCard key={i} />
            ))}
          </div>
        )}
        {type === "list" && (
          <div className="tour-list">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonTourRow key={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
