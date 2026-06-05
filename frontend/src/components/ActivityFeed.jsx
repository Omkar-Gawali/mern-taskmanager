import { useEffect, useState } from "react";

import API from "../services/api";

function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const res = await API.get("/tasks/activity");
      setActivities(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="activity-card">
      <div className="activity-header">
        <h2 className="activity-title">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Recent activity
        </h2>
        <span className="activity-count">{activities.length} events</span>
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="loader" aria-label="Loading activity" />
        </div>
      ) : activities.length > 0 ? (
        <div className="activity-list">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity._id} className="activity-item">
              <span className="activity-action">{activity.action}</span>
              <span className="activity-task">{activity.taskTitle}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-activity">No activity yet</div>
      )}

      {activities.length > 5 && (
        <div className="more-activity">
          +{activities.length - 5} more events
        </div>
      )}
    </div>
  );
}

export default ActivityFeed;
