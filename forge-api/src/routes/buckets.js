import { Router } from "express";
import { bucketController } from "../controllers/index.js";

const router = Router();

router.get("/", bucketController.getBuckets);
router.get("/:id", bucketController.getBucketById);
router.post("/", bucketController.createBucket);
router.delete("/:id", bucketController.deleteBucketById);

export default router;
