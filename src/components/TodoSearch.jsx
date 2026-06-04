import { useState, useEffect } from 'react'

function TodoSearch({ todos, setFilteredTodos }) {

  const [search, setSearch] = useState("");

  useEffect(() => {
    const filtered = todos.filter((todo) =>
      todo.text.includes(search)
    );

    setFilteredTodos(filtered);

  }, [search, todos]);

  return (
    <input
      type="text"
      placeholder="검색"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

export default TodoSearch