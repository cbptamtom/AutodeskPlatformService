import mongoose, { Schema, ObjectId } from "mongoose";

const FileSchema = new Schema({
	bucketId: { type: ObjectId, ref: "Bucket" }, // Reference to Bucket model
	name: { type: String, required: true },
	url: { type: String, required: true },
	// Other file properties if needed
});

const File = mongoose.model("File", FileSchema);

export default File;
