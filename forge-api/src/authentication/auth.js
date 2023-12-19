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
	const token = req.headers?.authorization?.split(" ")[1];

	try {
		debugger;

		let jwtObject = jwt.verify(token, process.env.JWT_SECRET);
		const isExpired = Date.now() >= jwtObject.exp * 1000;
		if (isExpired) {
			return res.result(HttpStatusCode.BAD_REQUEST).json({ message: "Token is expired" });
		} else {
			next();
		}
	} catch (exception) {
		return res.status(HttpStatusCode.BAD_REQUEST).json({ message: exception.message });
	}

	// other requests
	// get and validate token
}
