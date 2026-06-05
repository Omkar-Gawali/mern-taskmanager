import { useState, useEffect } from "react";

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        priority: editingTask.priority || "Medium",
        dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
        status: editingTask.status || "Pending",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        status: "Pending",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingTask) {
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        status: "Pending",
      });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="task-form-title">
        {editingTask ? "Edit task" : "New task"}
      </h2>

      <div className="task-form-grid">
        {/* Title - full width */}
        <div className="form-field task-form-full">
          <label className="form-label" htmlFor="tf-title">
            Title
          </label>
          <input
            id="tf-title"
            className="form-input"
            type="text"
            name="title"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description - full width */}
        <div className="form-field task-form-full">
          <label className="form-label" htmlFor="tf-desc">
            Description
          </label>
          <textarea
            id="tf-desc"
            className="form-textarea"
            name="description"
            placeholder="Add any details or notes…"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        {/* Priority */}
        <div className="form-field">
          <label className="form-label" htmlFor="tf-priority">
            Priority
          </label>
          <select
            id="tf-priority"
            className="form-select"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Due date */}
        <div className="form-field">
          <label className="form-label" htmlFor="tf-due">
            Due date
          </label>
          <input
            id="tf-due"
            className="form-input"
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        {/* Status — only when editing */}
        {editingTask && (
          <div className="form-field">
            <label className="form-label" htmlFor="tf-status">
              Status
            </label>
            <select
              id="tf-status"
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}
      </div>

      <div className="form-buttons">
        <button type="submit" className="form-submit-btn">
          {editingTask ? "Save changes" : "Create task"}
        </button>

        {editingTask && (
          <button type="button" className="form-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
