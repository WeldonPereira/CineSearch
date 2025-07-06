import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;
const imageBase = import.meta.env.VITE_IMG;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const queryParam = useQuery().get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchMovies = async (searchTerm, pageNumber = 1, append = false) => {
    if (!searchTerm) {
      setMovies([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${searchURL}?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(
          searchTerm
        )}&page=${pageNumber}`
      );
      const data = await res.json();

      if (append) {
        setMovies((prev) => [...prev, ...data.results]);
      } else {
        setMovies(data.results);
      }
      setTotalPages(data.total_pages);
      setPage(pageNumber);
    } catch (err) {
      console.error("Erro ao buscar:", err);
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setQuery(queryParam);
    setPage(1);
    fetchMovies(queryParam, 1, false);
  }, [queryParam]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      fetchMovies(query, page + 1, true);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar filmes..."
          className="flex-grow rounded px-4 py-2 text-black"
        />
      </form>

      {loading && movies.length === 0 ? (
        <p className="text-center text-gray-300">Carregando...</p>
      ) : (
        <>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {movies.length > 0
              ? movies.map((movie) => (
                  <motion.div
                    key={movie.id}
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer group"
                    whileHover={{ scale: 1.05 }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${imageBase}${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=Sem+Imagem"
                      }
                      alt={movie.title}
                      className="w-full h-[350px] object-cover group-hover:opacity-90 transition-opacity duration-300"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-bold mb-1 truncate text-white">
                        {movie.title}
                      </h2>
                      <div className="flex items-center text-sm text-yellow-400">
                        <FaStar className="mr-1" />
                        {movie.vote_average.toFixed(1)} / 10
                      </div>
                    </div>
                    <div className="flex justify-center pb-4">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700 transition"
                      >
                        Ver mais detalhes
                      </Link>
                    </div>
                  </motion.div>
                ))
              : query && (
                  <p className="col-span-full text-center text-gray-400">
                    Nenhum filme encontrado para "{query}"
                  </p>
                )}
          </motion.div>

          {page < totalPages && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded cursor-pointer"
              >
                {loading ? "Carregando..." : "Ver mais filmes"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
