import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    try {
      const response = await fetch(
        `${moviesURL}/movie/${id}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Erro ao buscar o filme:", error);
    }
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  if (!movie) return <div className="text-white p-4">Carregando...</div>;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-[300px] rounded shadow-lg"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-300 mb-4 italic">{movie.tagline}</p>

          <p className="text-lg mb-4">{movie.overview}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <p><span className="font-bold text-white">Duração:</span> {movie.runtime} min</p>
            <p><span className="font-bold text-white">Nota:</span> {movie.vote_average.toFixed(1)} / 10</p>
            <p><span className="font-bold text-white">Lançamento:</span> {movie.release_date}</p>
            <p><span className="font-bold text-white">Idioma:</span> {movie.original_language.toUpperCase()}</p>
            <p className="col-span-2">
              <span className="font-bold text-white">Gêneros:</span>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
