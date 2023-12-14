const getAllUsers = async (req, res) => {};
import { query, body, validationResult } from "express-validator";

const login = async (req, res) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	res.status(200).json({ message: "Login user successfully", data: "Detail user here..." });
};

const register = async (req, res) => {
	res.status(200).json({ message: "Register user successfully", data: "Detail user here..." });
};
const getDetailUser = async (req, res) => {};

export default { login, register, getDetailUser, getAllUsers };
