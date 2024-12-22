import { useState, useEffect } from "react";
import { FaPhoneAlt, FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import EmptyList from "./emptyList";
import UserCard from "./userCard";

const SearchResults = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("user_list.json");
      const jsonData = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlQuery = queryParams.get("query") || "";
    setSearchQuery(urlQuery);
  }, [location.search]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.first_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, data]);

  // Close the modal by setting selectedItem to null
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="font-inter min-h-screen bg-gradient-to-t from-blue-300 to-transparent p-6 flex flex-col items-center">
      <div className="w-full max-w-md mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400 text-xl" />
          </div>

          <input
            className="w-full p-4 pl-10 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="https://i.ibb.co/wyNf9q6/coder.webp"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-2">{`${item.first_name} ${item.last_name}`}</h3>
              <p className="text-gray-500 text-sm flex items-center mb-4">
                <FaLocationDot className="mr-2 text-black-500" />
                {item.city}
              </p>

              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 flex items-center">
                    <FaPhoneAlt
                      style={{ color: "black", fontWeight: "800" }}
                      className="mr-2"
                    />
                    {item.contact_number}
                  </p>
                  <p className="text-xs text-gray-400">Available on phone</p>
                </div>
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none"
                  onClick={() => setSelectedItem(item)}
                >
                  Fetch Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
      {selectedItem && (
        <UserCard selectedItem={selectedItem} closeModal={closeModal} />
      )}
    </div>
  );
};

export default SearchResults;
