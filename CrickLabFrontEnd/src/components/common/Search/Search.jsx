const Search = ({ data, onClick }) => {
  return (
    <div className="flex flex-row gap-2 overflow-x-auto p-3  z-10 ">
      <button
        className="bg-white px-2 py-1 rounded-xl"
        onClick={() => onClick("")} // Pass item._id to the onClick function
      >
        All
      </button>
      {data.map((item) => {
        return (
          <button
            key={item._id}
            className="bg-white px-2 py-1 rounded-xl"
            onClick={() => onClick(item._id)} // Pass item._id to the onClick function
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
};

export default Search;
