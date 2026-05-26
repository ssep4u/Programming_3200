import TodoItemEmpty from "./TodoItemEmpty.jsx"
import TodoItem from "./TodoItem.jsx"

export default function TodoList({ todos, ...rest }) {
    // isCompleted 값 기준으로 정렬 (완료 안 된 게 위에, 완료 된 게 아래)
    // [...todos]: 원본 배열을 건드리지 않기 위해 스프레드 연산자로 새로운 배열 복사
    // sort((a, b) => a.isCompleted - b.isCompleted):
    //   - false(0) - true(1) = -1 (위치 유지) -> 미완료가 위로
    //   - true(1) - false(0) = 1 (아래로 이동) -> 완료가 아래로
    //   - false(0) - false(0) = 0 (변화 없음) -> 같은 상태면 순서 유지
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