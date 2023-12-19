import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const Bucket = mongoose.model(
	"Bucket",
	new Schema({
		userId: { type: ObjectId, ref: "User" },
		bucketName: {
			type: String,
			require: true,
			validate: {
				validator: (value) => value.length > 3,
				message: "bucketName must be at least 3 characters",
			},
		},
		bucketKey: {
			type: String,
			require: true,
		},
		files: [{ type: ObjectId, ref: "File" }],
	})
);

export default Bucket;
