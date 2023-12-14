const getBuckets = ({ bucket }) => {
	return res.send("Get all buckets repository");
};

const getBucketById = ({ bucket }) => {
	return res.send("get bucket by Id repository");
};

const createBucket = ({ bucket }) => {
	return res.send("create new bucket repository");
};

const deleteBucketById = ({ bucket }) => {
	return res.send("delete bucket by Id repository");
};

export default { getBuckets, getBucketById, createBucket, deleteBucketById };
