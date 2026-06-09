// https://programming-3200.ssep4u.workers.dev/
import { useState, useEffect, useMemo, useRef } from "react";
import "./todolist.css";
import Button from "./components/Button.jsx";
import Checkbox from "./components/Checkbox.jsx";
import TodoItemEmpty from "./components/TodoItemEmpty.jsx";
import TodoHeader from "./components/TodoHeader.jsx";
import TodoAdder from "./components/TodoAdder.jsx";
import TodoItem from "./components/TodoItem.jsx";
import TodoList from "./components/TodoList.jsx";
import TodoSearch from "./components/TodoSearch.jsx"
import DateApp from './DateApp.jsx'

import bgm from "./assets/audio/Tbgm.mp3";

class Todo {
    constructor(id, text, isCompleted, updatedAt) {
        this.id = id;
        this.text = text;
        this.isCompleted = isCompleted;
        this.updatedAt = updatedAt;
    }
}
const TODOS_STORAGE_KEY = "todos"; //LocalStorage 용 key
// bgm 재생
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
function TodoListApp() {
  const initTodos = () => {
    //localStorage에서 가져오자
    const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    //값이 없으면 []
    //값이 있으면 todos의 초기값 대입하자
    return !savedTodos ? [] : JSON.parse(savedTodos); //string -> JSON 객체 또는 리스트
  };
  const [todos, setTodos] = useState(initTodos);
  const [filteredTodos, setFilteredTodos] = useState(initTodos);
  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos)); //JSON 객체 또는 리스트 -> string
  }, [todos]);

  function addTodo(text) {
    //이전 todos에 newTodo 만들어서 추가하자 -> 그것을 setTodos() 하자
    setTodos((todos) => [
      new Todo( // 새로 추가하는 항목을 앞에 넣어 맨 위에 표시
        Date.now(), //id: 고유 ID 시간을 이용. == new Date().getTime()
        text,       //text: 할 일 내용
        false       //isCompleted: 할 일의 완료 여부. 초기값은 false
      ),
      ...todos     // 기존 항목들은 뒤로
    ]);
  }
  function toggleTodo(id) {
    setTodos((todos) =>
      // todos에서 하나씩 꺼내서, todo, 꺼낸 todo의 id와 id 가 같다면,
      // 새 객체 만들어서 todo 값 복사, 속성 수정
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  }
  function deleteTodo(id) {
    // todos를 하나씩 꺼내어 todo, todo.id === id
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }
  function editTodo(id, newText) {
    //todos 하나씩 꺼내어 todo. id가 같으면 text: newText
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  }
  // 진행률 계산: 완료된 todo 개수 / 전체 todo 개수
  const { completedCount, totalCount, percent } = useMemo(() => {
    const completedCount = todos.filter((todo) => todo.isCompleted).length;
    const totalCount = todos.length;
    const percent =
      totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
    return { completedCount, totalCount, percent };
  }, [todos]);

  function toggleMusic() {
    if (!audioRef.current) return;

    if (isPlaying) {
        audioRef.current.pause();
    } else {
        audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
}
  
  return (
    <div className="todo">
      
      <TodoHeader
        completedCount={completedCount}
        totalCount={totalCount}
        percent={percent}
      />
    
    <DateApp/>
    
      <TodoAdder addTodo={addTodo} />
      {/* 검색 */}
      <TodoSearch todos={todos} setFilteredTodos={setFilteredTodos} />
      {/* 검색 결과 출력 */}
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default TodoListApp;
