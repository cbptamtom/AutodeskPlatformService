import { print, OutputType } from "../helper/print.js";
export default class Exception extends Error {
	static WRONG_DB_USERNAME_PASSWORD = "Wrong user name or password database";
	static WRONG_DB_SERVERNAME = "Wrong server name/connection string";
	static WRONG_DB_CANNOT = "Can not connect to mongoDB";
	constructor(message) {
		super(message);
		print(message, OutputType.ERROR);
	}
}
