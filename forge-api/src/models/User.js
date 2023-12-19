import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model(
	"User",
	new Schema({
		id: { type: ObjectId },
		name: {
			type: String,
			require: true,
			validate: {
				validator: (value) => value.length > 3,
				message: "username must be at least 3 characters",
			},
		},
		email: {
			type: String,
			validate: {
				validator: (value) => isEmail,
				message: "username must be at least 3 characters",
			},
		},
		password: {
			// hashed
			type: String,
			require: true,
			// validate?
		},
		phoneNumber: {
			type: String,
			require: true,
		},
		address: {
			type: String,
			require: true,
		},
		buckets: [{ type: ObjectId, ref: "Bucket" }],
	})
);
