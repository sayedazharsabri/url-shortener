import express from "express";
import { generateShortURL } from '../controllers/shortener';

const router = express.Router();

router.post("/", generateShortURL);

export default router;