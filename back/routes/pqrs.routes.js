import express from "express"
import { agregarPqrs, obtenerPqrs } from "../controllers/pqrs.controller.js";

const router = express.Router();

router.get("/", obtenerPqrs);
router.post("/", agregarPqrs);


export default router