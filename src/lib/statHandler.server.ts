import { R6CREDENTAILS } from '$env/static/private';

const appId = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';
// const spaceId = '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66';

let ticket: string;
let expire: string;
// let sessionId: string;

let nextTokenRefresh: number;

async function getAuth() {
	if (!ticket || nextTokenRefresh <= new Date().getTime()) {
		console.log('Requesting New Token');
		const out = await fetch('https://public-ubiservices.ubi.com/v3/profiles/sessions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Ubi-AppId': appId,
				Authorization: `Basic ${btoa(R6CREDENTAILS)}`
			},
			body: JSON.stringify({
				rememberMe: false
			})
		});
		const obj = await out.json();
		// sessionId = obj.sessionId;
		ticket = obj.ticket;
		expire = obj.expiration;
		nextTokenRefresh = new Date(expire).getTime();
	}
}

export async function getPlayerIdByUsername(username: string, platform: string) {
	await getAuth();

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
		return jsonOut.profiles[0].userId;
	} else {
		return null;
	}
}
