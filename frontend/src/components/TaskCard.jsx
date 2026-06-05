function TaskCard({ task, onEdit, onDelete }) {
  const priorityClass =
    { High: "high", Medium: "medium", Low: "low" }[task.priority] || "";
  const statusClass = task.status === "Completed" ? "completed" : "pending";

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  return (
    <div className="task-card">
      <div className="task-card-top">
        <h3 className="task-title">{task.title}</h3>
        <span className={`priority-badge ${priorityClass}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className={`status-badge ${statusClass}`}>{task.status}</span>
        <span className="due-date">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formattedDate}
        </span>
      </div>

      <div className="task-actions">
        <button className="edit-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
