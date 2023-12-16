const getBuckets = (req, res) => {
	return res.send("Get all buckets");
};

const getBucketById = (req, res) => {
	return res.send("get bucket by Id");
};

const createBucket = (req, res) => {
	return res.send("create new bucket");
};

// const deleteBucketById = (req, res) => {
// 	return res.send("delete bucket by Id");
// };

export default { getBuckets, getBucketById, createBucket };
