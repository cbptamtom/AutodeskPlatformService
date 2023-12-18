import { print } from "../helper/print.js";
import { User } from "../models/index.js";
import bcryptjs from "bcryptjs";
import Exception from "../exceptions/Exception.js";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
	const existingUser = await User.findOne({ email }).exec();
	if (!existingUser) {
		throw new Exception(Exception.USER_NOT_FOUND);
	}
	const isMatch = await bcryptjs.compare(password, existingUser.password);
	if (!isMatch) {
		throw new Exception(Exception.INVALID_PASSWORD);
	}

	// Create Token
	const token = jwt.sign(
		{
			data: existingUser,
		},
		process.env.JWT_SECRET,
		{
			// expiresIn: "60" //1 minute
			expiresIn: "10 days",
		}
	);
	return {
		...existingUser.toObject(),
		password: "Not Show",
		token,
	};
	// return token or relevant data
};

const register = async ({ name, email, password, phoneNumber, address }) => {
	try {
		const existingUser = await User.findOne({ email }).exec();

		if (!!existingUser) {
			throw new Exception(Exception.USER_EXIST);
		}
		const hashPassword = await bcryptjs.hash(password, parseInt(process.env.SALT_ROUNDS));
		const newUser = await User.create({
			name,
			email,
			password: hashPassword,
			phoneNumber,
			address,
		});
		return {
			...newUser._doc,
			password: "Not Show",
		};
	} catch (error) {
		// check model validation

		throw new Exception(Exception.CANNOT_REGISTER_USER);
	}
};
export default { login, register };
