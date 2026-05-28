import TodoItemEmpty from "./TodoItemEmpty.jsx"
import TodoItem from "./TodoItem.jsx"

export default function TodoList({ todos, ...rest }) {
    // 완료된 항목(isCompleted=true)은 뒤로 보내고, 미완료 항목은 앞에 오도록 정렬
    // 원본 todos 배열을 직접 변경하지 않기 위해 스프레드 연산자로 복사 후 정렬
    const sortedTodos = [...todos].sort((a, b) => a.isCompleted - b.isCompleted);
    
    return (
        <ul className="todo__list">
            {/* todos가 없으면, TodoItemEmpty */}
            {todos.length === 0 && <TodoItemEmpty />}
            {/* todos가 있으면, 정렬된 목록을 TodoItem으로 렌더링 */}
            {todos.length > 0 &&
                sortedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} {...rest} />)
            }
        </ul>
    )
}