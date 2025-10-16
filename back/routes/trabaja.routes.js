import express from "express"
import { agregarTrabaja } from "../controllers/trabaja.controller.js";

const router = express.Router();

router.post("/", agregarTrabaja);

export default router