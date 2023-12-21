import fs from "fs";
import pkg from "forge-apis";
const { AuthClientTwoLegged } = pkg;
import { APS_CLIENT_ID, APS_CLIENT_SECRET } from "../config/forgeConfig.js";

let internalAuthClient = new AuthClientTwoLegged(
	APS_CLIENT_ID,
	APS_CLIENT_SECRET,
	["bucket:read", "bucket:create", "data:read", "data:write", "data:create"],
	true
);
let publicAuthClient = new AuthClientTwoLegged(APS_CLIENT_ID, APS_CLIENT_SECRET, ["viewables:read"], true);

export const getInternalToken = async () => {
	if (!internalAuthClient.isAuthorized()) {
		await internalAuthClient.authenticate();
	}
	return internalAuthClient.getCredentials();
};

export const getPublicToken = async () => {
	if (!publicAuthClient.isAuthorized()) {
		await publicAuthClient.authenticate();
	}
	return publicAuthClient.getCredentials();
};

export const ensureBucketExists = async (bucketKey) => {
	try {
		await new APS.BucketsApi().getBucketDetails(bucketKey, null, await service.getInternalToken());
	} catch (err) {
		if (err.response.status === 404) {
			await new APS.BucketsApi().createBucket(
				{ bucketKey, policyKey: "persistent" },
				{},
				null,
				await service.getInternalToken()
			);
		} else {
			throw err;
		}
	}
};

export const listObjects = async () => {
	await service.ensureBucketExists(APS_BUCKET);
	let resp = await new APS.ObjectsApi().getObjects(APS_BUCKET, { limit: 64 }, null, await service.getInternalToken());
	let objects = resp.body.items;
	while (resp.body.next) {
		const startAt = new URL(resp.body.next).searchParams.get("startAt");
		resp = await new APS.ObjectsApi().getObjects(
			APS_BUCKET,
			{ limit: 64, startAt },
			null,
			await service.getInternalToken()
		);
		objects = objects.concat(resp.body.items);
	}
	return objects;
};

export const uploadObject = async (objectName, filePath) => {
	await service.ensureBucketExists(APS_BUCKET);
	const buffer = await fs.promises.readFile(filePath);
	const results = await new APS.ObjectsApi().uploadResources(
		APS_BUCKET,
		[{ objectKey: objectName, data: buffer }],
		{ useAcceleration: false, minutesExpiration: 15 },
		null,
		await service.getInternalToken()
	);
	if (results[0].error) {
		throw results[0].completed;
	} else {
		return results[0].completed;
	}
};

export const translateObject = async (urn, rootFilename) => {
	const job = {
		input: { urn },
		output: { formats: [{ type: "svf", views: ["2d", "3d"] }] },
	};
	if (rootFilename) {
		job.input.compressedUrn = true;
		job.input.rootFilename = rootFilename;
	}
	const resp = await new APS.DerivativesApi().translate(job, {}, null, await service.getInternalToken());
	return resp.body;
};

export const getManifest = async (urn) => {
	try {
		const resp = await new APS.DerivativesApi().getManifest(urn, {}, null, await service.getInternalToken());
		return resp.body;
	} catch (err) {
		if (err.response.status === 404) {
			return null;
		} else {
			throw err;
		}
	}
};

export const urnify = (id) => Buffer.from(id).toString("base64").replace(/=/g, "");
