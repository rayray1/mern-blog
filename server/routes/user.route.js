import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

// test api
router.get("/test", test);

export default router;
