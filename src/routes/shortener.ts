import express from "express";
import { generateShortURL, getOriginalURL } from '../controllers/shortener';

const router = express.Router();

router.post("/", generateShortURL);
router.get("/:shortURL", getOriginalURL);

export default router;