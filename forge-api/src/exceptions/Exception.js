import { print, OutputType } from "../helper/print.js";
export default class Exception extends Error {
	static WRONG_DB_USERNAME_PASSWORD = "Wrong user name or password database";
	static WRONG_DB_SERVERNAME = "Wrong server name/connection string";
	static WRONG_DB_CANNOT = "Can not connect to mongoDB";
	static USER_EXIST = "User already exists";
	static CANNOT_REGISTER_USER = "Can not register user";
	static WRONG_EMAIL_AND_PASSWORD = "Wrong email or password";
	static USER_NOT_FOUND = "User not found";
	static INVALID_PASSWORD = "Invalid password";
	constructor(message) {
		super(message);
		print(message, OutputType.ERROR);
	}
}
