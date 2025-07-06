import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch(
        `${moviesURL}/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`
      );
      const data = await response.json();
      setTopMovies(data.results);
    } catch (error) {
      console.error("Erro ao buscar os filmes:", error);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-extrabold mb-8 text-left tracking-wide"
      >
        Filmes mais aclamados
      </motion.h1>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
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
        {topMovies.map((movie) => (
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
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
