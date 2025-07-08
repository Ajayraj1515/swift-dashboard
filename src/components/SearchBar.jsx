const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-control mb-3"
    />
  );
};

export default SearchBar;
