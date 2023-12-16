import { print } from "../helper/print.js";
import { User } from "../models/index.js";

const login = async ({ email, password }) => {
	console.log("login user repository");
};

const register = async ({ name, email, password, address, phoneNumber, address }) => {
	try {
		let existingUser = await User.findOne({ email }).exec();
	} catch (error) {}
};
export default { login, register };
