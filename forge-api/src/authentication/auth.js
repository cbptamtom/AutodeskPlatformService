import HttpStatusCode from "../helper/HTTPStatusCode.js";
import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
	// bypass login, register
	if (
		req.url.toLowerCase().trim() == "/api/users/login".toLowerCase().trim() ||
		req.url.toLowerCase().trim() == "/api/users/register".toLowerCase().trim()
	) {
		next();
		return;
	}

	try {
		let jwtObject = jwt.verify(token, process.env.JWT_SECRET);
		const isExpired = Data.now() >= jwtObject.exp * 1000;
		if (isExpired) {
			res.result(HttpStatusCode.BAD_REQUEST).json({ message: "Token is expired" });
		}
		console.log(jwtObject);
	} catch (exception) {
		res.status(HttpStatusCode.BAD_REQUEST).json({ message: exception.message });
	}

	// other requests
	// get and validate token
	const token = req.headers?.authorization?.split(" ")[1];
	debugger;
}
