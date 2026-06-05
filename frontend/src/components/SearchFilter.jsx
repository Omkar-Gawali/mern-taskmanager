function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-input-wrap">
        <svg
          className="filter-icon"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="filter-input"
          placeholder="Search tasks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <select
        className="filter-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">All priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        className="filter-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="latest">Latest first</option>
        <option value="oldest">Oldest first</option>
        <option value="due">By due date</option>
      </select>
    </div>
  );
}

export default SearchFilter;
