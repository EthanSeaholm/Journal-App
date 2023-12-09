import express from "express";
import * as EntriesController from "../controllers/entries";

const router = express.Router();

router.get("/", EntriesController.getEntries);

router.get("/:entryId", EntriesController.getEntry);

router.post("/", EntriesController.createEntry);

router.patch("/:entryId", EntriesController.updateEntry);

router.delete("/:entryId", EntriesController.deleteEntry);

export default router;