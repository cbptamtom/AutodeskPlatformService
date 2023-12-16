import mongoose from "mongoose";
import { OutputType, print } from "../helper/print.js";
import Exception from "../exceptions/Exception.js";
async function connect() {
	try {
		let connection = await mongoose.connect(process.env.MONGO_URI);
		print("Connect MongoDB Successfully", OutputType.IMPORTANCE);
		return connection;
	} catch (error) {
		const { code } = error;
		if (code == 8000) {
			throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
		} else if (code == "ENOTFOUND") {
			throw new Exception(Exception.WRONG_DB_SERVERNAME);
		} else {
			throw new Exception(Exception.WRONG_DB_CANNOT);
		}
	}
}
export default connect;
