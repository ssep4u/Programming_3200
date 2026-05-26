import { useState } from "react";

export default function TodoSearchBar(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="todo 이름으로 검색"
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
      />
      <button onClick={() => props.onSearch(props.search)}>검색</button>
    </div>
  );
}
