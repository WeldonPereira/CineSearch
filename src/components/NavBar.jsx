import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import { useState } from "react";

const NavBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <motion.nav
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link
        to="/"
        className="text-3xl font-extrabold flex items-center gap-2 tracking-wide hover:text-blue-400 transition-colors"
      >
        <BiCameraMovie className="text-blue-400" />
        CineSearch
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 w-full sm:w-auto max-w-full sm:max-w-md"
      >
        <input
          type="text"
          placeholder="Buscar filme..."
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-3xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
          aria-label="Buscar"
        >
          <BiSearchAlt className="w-5 h-5" />
        </button>
      </form>
    </motion.nav>
  );
};

export default NavBar;
