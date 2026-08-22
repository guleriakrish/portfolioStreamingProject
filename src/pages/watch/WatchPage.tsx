// WatchPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import HlsPlayer from "../../components/HlsPlayer/HlsPlayer";
import type { Movie } from "../../components/api/api";

const API_BASE = "https://ujmshy8j51.execute-api.ap-south-1.amazonaws.com";

const WatchPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    axios
      .get<Movie>(`${API_BASE}/movies`, { params: { slug } })
      .then((res) => setMovie(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="watch-page__status">Loading…</div>;
  if (error || !movie)
    return <div className="watch-page__status">Could not load this film.</div>;

  return (
    <div className="watch-page">
      <button className="watch-page__close" onClick={() => navigate(-1)}>
        ✕
      </button>
      <HlsPlayer
        src={movie.playback_url}
        poster={movie.poster_url}
        autoplay
        controls
      />
    </div>
  );
};

export default WatchPage;