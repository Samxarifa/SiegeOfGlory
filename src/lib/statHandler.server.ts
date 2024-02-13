import { R6CREDENTAILS } from '$env/static/private';

// Details Needed for R6 API (I don't know what they are but I need them so...)
const appId = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';
// const spaceId = '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66';

// Variables set by updateAuth()
let ticket: string;
let expire: string;
// let sessionId: string;

let nextTokenRefresh: number;

// Gets new auth ticket from R6 API if don't have one already or current has expired
async function updateAuth() {
	if (!ticket || nextTokenRefresh <= new Date().getTime()) {
		// console.log('Requesting New Token');

		// Gets ticket using login credentials from .env file
		const out = await fetch('https://public-ubiservices.ubi.com/v3/profiles/sessions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Ubi-AppId': appId,
				Authorization: `Basic ${btoa(R6CREDENTAILS)}`
			}
		});
		const obj = await out.json();

		// Sets variables to new ticket and expire
		// sessionId = obj.sessionId;
		ticket = obj.ticket;
		expire = obj.expiration;
		nextTokenRefresh = new Date(expire).getTime();
	}
}

// Gets R6 Player ID using username and platform
export async function getPlayerIdByUsername(username: string, platform: string) {
	await updateAuth();

	const out = await fetch(
		`https://public-ubiservices.ubi.com/v2/profiles?platformType=${platform}&nameOnPlatform=${username}`,
		{
			headers: {
				'Ubi-AppId': appId,
				Authorization: `ubi_v1 t=${ticket}`
			}
		}
	);
	const jsonOut = await out.json();
	if (jsonOut?.profiles[0]?.userId) {
		// Returns User ID if user exists
		return jsonOut.profiles[0].userId;
	} else {
		// Returns Null if user doesn't exit
		return null;
	}
}
