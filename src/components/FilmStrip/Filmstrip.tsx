import React from "react";
import "./FilmsStrip.css";

export interface CreditLine {
  role: string; // e.g. "Director", "Producer", "Music"
  name: string; // e.g. "Satyajit Ray"
}

export interface FilmReelCardProps {
  /** Left frame: vertical poster image (native size 480x640) */
  posterSrc?: string;
  posterAlt?: string;
  /** Middle frame: titles + short synopsis */
  title_en?: string;
  title_bn?: string;
  year?:number | string;
  description?: string;
  /** Right frame: crew/cast credits */
  credits?: CreditLine[];
  className?: string;
  onPlay?: () => void;
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
  title_en,
  title_bn,
  description,
  credits = [],
  className,
  onPlay,
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

        {/* MIDDLE — titles + description (largest) */}
        <div className="reel__frame reel__frame--desc">
          <div className="reel__gate reel__gate--desc">
            {title_en || title_bn || description ? (
              <div className="reel__desc-content">
                {(title_en || title_bn) && (
                  <div className="reel__title-block">
                    {title_en && (
                      <h3 className="reel__desc-title reel__desc-title--en">
                        {title_en}
                      </h3>
                    )}
                    {title_bn && (
                      <h4 className="reel__desc-title reel__desc-title--bn">
                        {title_bn}
                      </h4>
                    )}
                  </div>
                )}
                {description && (
                  <p className="reel__desc-text">{description}</p>
                )}
              </div>
            ) : (
              <span className="reel__gate-empty" />
            )}
            <button className="reel__play-btn" onClick={onPlay}>
              Play
            </button>
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
  <div className="reel__sprocket-row">
    {Array.from({ length: 28 }).map((_, i) => (
      <span key={i} className="reel__sprocket-hole" />
    ))}
  </div>
);

export default FilmReelCard;
