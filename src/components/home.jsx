import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.svg";
import homeLogo from "../assets/logo-home.svg";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    // Validation logic
    if (!searchTerm.trim()) {
      setErrorMessage("Please enter a search term.");
      return;
    }
    if (searchTerm.length < 3) {
      setErrorMessage("Search term must be at least 3 characters long.");
      return;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(searchTerm)) {
      setErrorMessage(
        "Invalid input. Please use only letters, numbers, and spaces."
      );
      return;
    }

    try {
      navigate(`/search-results?query=${searchTerm}`);
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div
        className="relative h-full w-full bg-cover bg-center flex flex-col items-center justify-start"
        style={{ backgroundImage: `url(${home})` }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-blue-300 to-transparent"></div>
        <div className="z-10 w-full flex flex-col items-center pt-40 sm:pt-20">
          <img
            src={homeLogo}
            alt="Girman Logo"
            className="mb-20 w-[220px] sm:w-[350px] md:w-[450px] lg:w-[650px] xl:w-[800px] mx-4"
          />
          <form
            onSubmit={handleSearch}
            className="relative w-[220px] sm:w-[350px] md:w-[450px] lg:w-[650px] xl:w-[800px] mx-4"
          >
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
          </form>
          {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
