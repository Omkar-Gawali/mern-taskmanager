import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar.jsx";
import StatsCards from "../components/StatsCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskCard from "../components/TaskCard.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import Pagination from "../components/Pagination.jsx";
import ActivityFeed from "../components/ActivityFeed.jsx";

import API from "../services/api.js";

import "../styles/dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);

  const [editingTask, setEditingTask] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("");

  const [priority, setPriority] = useState("");

  const [sort, setSort] = useState("latest");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset to page 1 whenever filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, status, priority, sort]);

  // Initial load
  useEffect(() => {
    const initialize = async () => {
      try {
        await Promise.all([fetchTasks(), fetchStats()]);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  // Fetch whenever page or filters change (after initial load)
  useEffect(() => {
    if (!loading) {
      fetchTasks();
    }
  }, [currentPage, debouncedSearch, status, priority, sort]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/tasks/stats");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get(
        `/tasks?page=${currentPage}&limit=4&search=${debouncedSearch}&status=${status}&priority=${priority}&sort=${sort}`,
      );

      setTasks(res.data.tasks || []);

      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (taskData) => {
    try {
      await API.post("/tasks", taskData);

      toast.success("Task Created Successfully");

      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error("Failed To Create Task");
    }
  };

  const updateTask = async (taskData) => {
    try {
      await API.put(`/tasks/${editingTask._id}`, taskData);

      toast.success("Task Updated Successfully");

      setEditingTask(null);

      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error("Failed To Update Task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);

      toast.success("Task Deleted Successfully");

      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error("Failed To Delete Task");
    }
  };

  if (loading) {
    return <div className="loading">Loading…</div>;
  }

  return (
    <div className="dashboard">
      <Navbar />

      <StatsCards stats={stats} />

      <TaskForm
        onSubmit={editingTask ? updateTask : createTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        sort={sort}
        setSort={setSort}
      />

      <div className="task-grid">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={setEditingTask}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <div className="empty-state">No tasks found</div>
        )}
      </div>

      {/* ActivityFeed sits outside the task-grid so it spans full width */}
      <ActivityFeed />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Dashboard;
