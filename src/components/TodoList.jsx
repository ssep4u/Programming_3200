import TodoItemEmpty from "./TodoItemEmpty.jsx"
import TodoItem from "./TodoItem.jsx"

export default function TodoList({ todos, ...rest }) {
    // isCompleted 값 기준으로 정렬 (완료 안 된 게 위에, 완료 된 게 아래)
    const sortedTodos = [...todos].sort((a, b) => a.isCompleted - b.isCompleted);
    
    return (
        <ul className="todo__list">
            {/* todos가 없으면, TodoItemEmpty */}
            {todos.length === 0 && <TodoItemEmpty />}
            {/* todos가 있으면, TodoItem에 todos 던지기 */}
            {todos.length > 0 &&
                // todos에서 하나씩 꺼내서 todo -> <TodoItem todo={todo} />
                sortedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} {...rest} />)
            }
        </ul>
    )
}