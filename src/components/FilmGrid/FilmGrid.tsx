import { useEffect, useState } from "react";
import { fetchMovies } from "../api/api";
import type { Movie } from "../api/api";
import FilmReelCard from "../FilmStrip/Filmstrip";
import { useNavigate } from "react-router";

function FilmGrid() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovies()
      .then((movies) => setMovies(movies))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading reels…</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <div className="film-grid">
      {movies.map((movie) => (
        <FilmReelCard
          key={movie.slug}
          posterSrc={movie.card_url}
          title_en={movie.title_en}
          title_bn={movie.title_bn}
          year={movie.year}
          description={movie.synopsis}
          credits={movie.credits}
          onPlay={() => navigate("/watch/${movie.slug}")}
        />
      ))}
    </div>
  );
}

export default FilmGrid;
