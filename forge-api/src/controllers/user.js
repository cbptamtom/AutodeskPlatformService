import HttpStatusCode from "./../helper/HTTPStatusCode.js";
const getAllUsers = async (req, res) => {
	res.json("AAA");
};
import { query, body, validationResult } from "express-validator";

const login = async (req, res) => {
	const { email, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
	}
	res.status(HttpStatusCode.OK).json({ message: "Login user successfully", data: { email, password } });
};

const register = async (req, res) => {
	res.status(HttpStatusCode.INSERT_OK).json({ message: "Register user successfully", data: "Detail user here..." });
};
const getDetailUser = async (req, res) => {};

export default { login, register, getDetailUser, getAllUsers };
