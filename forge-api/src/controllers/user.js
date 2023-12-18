import HttpStatusCode from "./../helper/HTTPStatusCode.js";
import { userRepository } from "../repositories/index.js";
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
	try {
		let existingUser = await userRepository.login({ email, password });
		res.status(HttpStatusCode.OK).json({ message: "Login user successfully", data: existingUser });
	} catch (exception) {
		res.status(HttpStatusCode.INTERNAL_SEVER_ERROR).json({
			message: exception.toString(),
		});
	}
};

const register = async (req, res) => {
	const { name, email, password, phoneNumber, address } = req.body;

	try {
		const user = await userRepository.register({ name, email, password, phoneNumber, address });
		res.status(HttpStatusCode.INSERT_OK).json({
			message: "Register user successfully",
			data: user,
		});
	} catch (exception) {
		res.status(HttpStatusCode.INTERNAL_SEVER_ERROR).json({
			message: exception.toString(),
		});
	}
};
const getDetailUser = async (req, res) => {};

export default { login, register, getDetailUser, getAllUsers };
