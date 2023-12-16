import { Router } from "express";
import { query, body, validationResult } from "express-validator";
import { userController } from "../controllers/index.js";
const router = Router();

// Define middleware functions for user management
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getDetailUser);
router.post("/login", body("email").isEmail(), body("password").isLength({ min: 5 }), userController.login);
router.post("/register", userController.register);

router.put("/:id", (req, res) => {
	// Handle update user request
});

router.delete("/:id", (req, res) => {
	// Handle delete user request
});

export default router;
