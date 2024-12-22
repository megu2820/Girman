import noResult from "../assets/no-result.svg";

const EmptyList = () => (
  <div className="flex flex-col items-center justify-center mt-10">
    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-blue-300 to-transparent"></div>
    <img
      src={noResult}
      alt="No Results Found"
      className="w-80 h-60 object-contain mb-4"
    />
    <p className="text-gray-600 text-lg">
      No results found. Please try another search term.
    </p>
  </div>
);

export default EmptyList;
