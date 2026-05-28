import CheckBox from "./CheckBox.jsx";
import Button from "./Button.jsx";
import { useState } from "react";

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);  // 수정중인지 아닌지
    const [editText, setEditText] = useState(todo.text);    // 수정중인 text
    function handletEditClick() {
        if (!isEditing) {    // edit 시작
            setIsEditing(true);
            setEditText(todo.text);
        } else {    // edit 끝
            const trimmedText = editText.trim();
            // 빈칸이 아니고, 이전 text가 아닐 때만 editTodo()
            if (trimmedText !== "" && trimmedText !== todo.text) {
                editTodo(todo.id, trimmedText);
            }
            setIsEditing(false);
        }
    }
    return (
        // todo.isCompoleted가 true면 " todo__item--complete", false ""
        <li className={`todo__item${todo.isCompleted ? " todo__item--complete" : ""}`}>
            {
                !isEditing &&
                <CheckBox
                    id={todo.id}
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id)}
                >
                    {todo.text}
                </CheckBox>
            }

            {isEditing &&
                <input
                    type="text"
                    className="todo__input--edit"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handletEditClick();
                        }
                    }}
                    autoFocus
                />
            }

            <span className="todo__date">
                {todo.updatedAt}
            </span>
            
            <Button
                className='todo__button todo__button--edit'
                onClick={handletEditClick}
            >
                {isEditing ? "💾" : "🤺"}
            </Button>

            <Button
                className='todo__button todo__button--delete'
                onClick={() => deleteTodo(todo.id)}
            >
                🗑️
            </Button>
        </li>
    )
}
