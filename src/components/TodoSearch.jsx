export default function TodoSearch({ searchText, setSearchText }) {
  function handleChange(e) {
    setSearchText(e.target.value);
  }
  return (
    <div className="todo-search">
      <input
        type="text"
        placeholder="할 일 검색..."
        value={searchText}
        onChange={handleChange}
      />
    </div>
  );
}
