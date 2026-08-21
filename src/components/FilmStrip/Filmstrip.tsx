import React from "react";
import "./FilmsStrip.css"

export interface CreditLine {
  role: string; // e.g. "Director", "Producer", "Music"
  name: string; // e.g. "Satyajit Ray"
}

export interface FilmReelCardProps {
  /** Left frame: vertical poster image (native size 480x640) */
  posterSrc?: string;
  posterAlt?: string;
  /** Middle frame: short synopsis */
  title?: string;
  description?: string;
  /** Right frame: crew/cast credits */
  credits?: CreditLine[];
  className?: string;
}

/**
 * FilmReelCard
 *
 * A 3-section filmstrip layout with unequal widths:
 * left (poster, narrow) — middle (synopsis, widest) — right (credits, narrow).
 * Sprocket-hole borders top & bottom; soot/bone/ochre palette.
 */
const FilmReelCard: React.FC<FilmReelCardProps> = ({
  posterSrc,
  posterAlt = "",
  title,
  description,
  credits = [],
  className,
}) => {
  return (
    <div className={`reel ${className ?? ""}`}>
      <SprocketRow />

      <div className="reel__frames">
        {/* LEFT — poster */}
        <div className="reel__frame reel__frame--poster">
          <div className="reel__gate reel__gate--poster">
            {posterSrc ? (
              <img src={posterSrc} alt={posterAlt} />
            ) : (
              <span className="reel__gate-empty" />
            )}
          </div>
          <div className="reel__caption">Poster</div>
        </div>

        <div className="reel__perf" />

        {/* MIDDLE — description (largest) */}
        <div className="reel__frame reel__frame--desc">
          <div className="reel__gate reel__gate--desc">
            {title || description ? (
              <div className="reel__desc-content">
                {title && <h3 className="reel__desc-title">{title}</h3>}
                {description && (
                  <p className="reel__desc-text">{description}</p>
                )}
              </div>
            ) : (
              <span className="reel__gate-empty" />
            )}
            <button className="reel__play-btn">Play</button>
          </div>

          <div className="reel__caption">Synopsis</div>
        </div>

        <div className="reel__perf" />

        {/* RIGHT — credits */}
        <div className="reel__frame reel__frame--credits">
          <div className="reel__gate reel__gate--credits">
            {credits.length > 0 ? (
              <dl className="reel__credits-list">
                {credits.map((c, i) => (
                  <div className="reel__credit-row" key={i}>
                    <dt>{c.role}</dt>
                    <dd>{c.name}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <span className="reel__gate-empty" />
            )}
          </div>
          <div className="reel__caption">Credits</div>
        </div>
      </div>

      <SprocketRow />


    </div>
  );
};

/** Top/bottom sprocket-hole strip */
const SprocketRow: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      padding: "0 0.4rem",
    }}
  >
    {Array.from({ length: 28 }).map((_, i) => (
      <span
        key={i}
        style={{
          width: "8px",
          height: "10px",
          background: "#E4DCC8",
          borderRadius: "1px",
        }}
      />
    ))}
  </div>
);

export default FilmReelCard;
