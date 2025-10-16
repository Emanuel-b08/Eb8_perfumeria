import express from "express"
import { agregarContactanos, obtenerContactanos } from "../controllers/contactanos.controller.js";

const router = express.Router();

router.get("/", obtenerContactanos);
router.post("/", agregarContactanos);


export default router