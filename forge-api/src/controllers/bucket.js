import HttpStatusCode from "../helper/HTTPStatusCode.js";
import { print } from "../helper/print.js";
import pkg from "forge-apis";
const { BucketsApi, ObjectsApi, PostBucketsPayload } = pkg;
import { getPublicToken } from "../middleware/forgeMiddleware.js";
const getBuckets = async (req, res) => {
	return res.send(await getPublicToken());
};

const getBucketById = (req, res) => {
	return res.send("get bucket by Id");
};

const createBucket = (req, res) => {
	const { bucketName } = req.body;
	if (!bucketName) res.status(HttpStatusCode.NOT_FOUND).json({ message: "input payment" });
	res.send({ bucketName });
};

// const deleteBucketById = (req, res) => {
// 	return res.send("delete bucket by Id");
// };

export default { getBuckets, getBucketById, createBucket };
