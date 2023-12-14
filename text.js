const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const login = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array(), result: false });
		}

		const { username, password } = req.body;
		const user = await AccountModel.findOne({ username }).populate({
			path: "bucketID",
			populate: { path: "fileID" },
		});

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid credentials", result: false });
		}

		const { password: userPassword, _id, ...others } = user.toObject();
		const accessToken = generateToken(user._id, process.env.JWT_SECRET, "1h");
		const refreshToken = generateToken(user._id, process.env.JWT_REFRESH_SECRET, "7d");

		await storeRefreshTokenInDB(user._id, refreshToken);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			sameSite: "strict",
		});
		res.status(200).json({ message: "Login successful", ...others, result: true, accessToken });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ message: "Server error", result: false });
	}
};

const generateToken = (userId, secret, expiresIn) => {
	return jwt.sign({ userId }, secret, { expiresIn });
};

async function storeRefreshTokenInDB(userId, refreshToken) {
	// Replace this with your logic to store the refresh token securely in the database
}

module.exports = { login };
