import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskStats,
  getActivity,
} from "../controllers/taskController.js";

const router = express.Router();

/*
----------------------------------
Dashboard Routes
----------------------------------
*/

router.get("/stats", protect, getTaskStats);

router.get("/activity", protect, getActivity);

/*
----------------------------------
Task CRUD Routes
----------------------------------
*/

router.route("/").post(protect, createTask).get(protect, getTasks);

router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

export default router;
