export default function TodoHeader({ completedCount = 0, totalCount = 0, percent = 0 }) {
    return (
        <div className="todo__header">
            <h1 className="todo__title">ToDo ToDo</h1>
            <div className="todo__progress">
                <div className="todo__progress-label">
                    <span>진행률</span>
                    <span>{completedCount} / {totalCount} ({percent}%)</span>
                </div>
                <div className="todo__progress-bar">
                    <div
                        className="todo__progress-bar-fill"
                        style={{ width: `${percent}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
