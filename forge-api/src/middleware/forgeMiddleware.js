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
