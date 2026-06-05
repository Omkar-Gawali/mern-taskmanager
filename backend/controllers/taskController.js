import Task from "../models/Task.js";
import Activity from "../models/Activity.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      userId: req.user._id,
    });

    await Activity.create({
      action: "Created Task",
      taskTitle: task.title,
      userId: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";

    const query = {
      userId: req.user._id,
      title: {
        $regex: search,
        $options: "i",
      },
    };

    if (req.query.status) {
      query.status = req.query.status;
    }

    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    const sort = req.query.sort || "latest";

    let sortOption = {};

    switch (sort) {
      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;

      case "due":
        sortOption = {
          dueDate: 1,
        };
        break;

      default:
        sortOption = {
          createdAt: -1,
        };
    }

    const totalTasks = await Task.countDocuments(query);

    const tasks = await Task.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    Object.assign(task, req.body);

    await task.save();

    await Activity.create({
      action: "Updated Task",
      taskTitle: task.title,
      userId: req.user._id,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Activity.create({
      action: "Deleted Task",
      taskTitle: task.title,
      userId: req.user._id,
    });

    await task.deleteOne();

    res.json({
      message: "Task Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Task.countDocuments({
      userId,
    });

    const completed = await Task.countDocuments({
      userId,
      status: "Completed",
    });

    const pending = await Task.countDocuments({
      userId,
      status: "Pending",
    });

    const overdue = await Task.countDocuments({
      userId,
      status: "Pending",
      dueDate: {
        $lt: new Date(),
      },
    });

    res.json({
      total,
      completed,
      pending,
      overdue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getActivity = async (req, res) => {
  try {
    const activity = await Activity.find({
      userId: req.user._id,
    })
      .sort({
        createdAt: -1,
      })
      .limit(10);

    res.json(activity);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
