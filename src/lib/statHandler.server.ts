import { env } from '$env/dynamic/private';

export interface ProfilePageReturn {
	wins: number;
	losses: number;
	kills: number;
	deaths: number;
	kd: number;
	wl: number;
}

// Details Needed for R6 API (I don't know what they are but I need them so...)
const appId = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';
const spaceId = '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66';

// Variables set by updateAuth()
let ticket: string;
let expire: string;
let sessionId: string;

let nextTokenRefresh: number;

// Gets new auth ticket from R6 API if don't have one already or current has expired
async function updateAuth() {
	if (!ticket || nextTokenRefresh <= new Date().getTime()) {
		// Gets ticket using login credentials from .env file
		const out = await fetch('https://public-ubiservices.ubi.com/v3/profiles/sessions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Ubi-AppId': appId,
				Authorization: `Basic ${btoa(env.R6CREDENTAILS)}`
			}
		});
		const obj = await out.json();

		// Sets variables to new ticket and expire
		sessionId = obj.sessionId;
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

// Gets R6 stats for profile page using player ID
export async function getProfilePageStats(playerId: string) {
	await updateAuth();
	// Gets start and end date for stats (Last 7 Days)
	const endDate = new Date();
	const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
	// Converts dates to format needed for API
	const start = startDate.toISOString().split('T')[0].replaceAll('-', '');
	const end = endDate.toISOString().split('T')[0].replaceAll('-', '');

	let toBeReturned: ProfilePageReturn;

	// Gets stats from R6 API
	try {
		const out = await fetch(
			'https://prod.datadev.ubisoft.com/v1/users/' +
				playerId +
				'/playerstats?spaceId=' +
				spaceId +
				'&view=current&aggregation=summary&gameMode=all,ranked,casual,unranked&platformGroup=all&startDate=' +
				start +
				'&endDate=' +
				end,
			{
				headers: {
					'Ubi-SessionId': sessionId,
					Authorization: `ubi_v1 t=${ticket}`,
					expiration: expire,
					'Ubi-AppId': appId
				}
			}
		);

		if (out.status !== 200) {
			throw new Error('Invalid Status Code: ' + out.status);
		}
		const jsonOut = await out.json();
		const stats = jsonOut.profileData[playerId].platforms.all.gameModes.ranked.teamRoles.all[0];
		toBeReturned = {
			wins: stats.matchesWon,
			losses: stats.matchesLost,
			kills: stats.kills,
			deaths: stats.death,
			kd: stats.killDeathRatio.value,
			wl: stats.winLossRatio
		};
	} catch {
		// If stats can't be found, return 0 for all stats
		toBeReturned = {
			wins: 0,
			losses: 0,
			kills: 0,
			deaths: 0,
			kd: 0,
			wl: 0
		};
	}
	return toBeReturned;
}

// Gets R6 stats for completed Battle
export async function getBattleStats(
	player1: string,
	player2: string,
	statType: string,
	battleDate: string
) {
	await updateAuth();
	const date = new Date(battleDate);

	const dateString = date.toISOString().split('T')[0].replaceAll('-', '');

	let toBeReturned;

	let stats1;
	let stats2;
	// Gets Player 1 and Player 2 stats from R6 API
	try {
		const player1Out = await fetch(
			'https://prod.datadev.ubisoft.com/v1/users/' +
				player1 +
				'/playerstats?spaceId=' +
				spaceId +
				'&view=current&aggregation=summary&gameMode=all,ranked,casual,unranked&platformGroup=all&startDate=' +
				dateString +
				'&endDate=' +
				dateString,
			{
				headers: {
					'Ubi-SessionId': sessionId,
					Authorization: `ubi_v1 t=${ticket}`,
					expiration: expire,
					'Ubi-AppId': appId
				}
			}
		);
		const json1Out = await player1Out.json();
		stats1 = json1Out.profileData[player1].platforms.all.gameModes.ranked.teamRoles.all[0];
	} catch {
		// If player 1 stats not found, set stats to undefined
		stats1 = { kills: undefined, death: undefined, winLossRatio: undefined };
	}

	try {
		const player2Out = await fetch(
			'https://prod.datadev.ubisoft.com/v1/users/' +
				player2 +
				'/playerstats?spaceId=' +
				spaceId +
				'&view=current&aggregation=summary&gameMode=all,ranked,casual,unranked&platformGroup=all&startDate=' +
				dateString +
				'&endDate=' +
				dateString,
			{
				headers: {
					'Ubi-SessionId': sessionId,
					Authorization: `ubi_v1 t=${ticket}`,
					expiration: expire,
					'Ubi-AppId': appId
				}
			}
		);
		const json2Out = await player2Out.json();
		stats2 = json2Out.profileData[player2].platforms.all.gameModes.ranked.teamRoles.all[0];
	} catch {
		// If player 2 stats not found, set stats to undefined
		stats2 = { kills: undefined, death: undefined, winLossRatio: undefined };
	}

	// Returns stats based on statType provided
	if (statType === 'k') {
		toBeReturned = {
			player1: stats1.kills,
			player2: stats2.kills
		};
	} else if (statType === 'd') {
		toBeReturned = {
			player1: stats1.death,
			player2: stats2.death
		};
	} else if (statType === 'w') {
		toBeReturned = {
			player1: stats1.winLossRatio === 0.0 ? stats1.matchesWon : stats1.winLossRatio,
			player2: stats2.winLossRatio === 0.0 ? stats2.matchesWon : stats2.winLossRatio
		};
	}
	return toBeReturned;
}
