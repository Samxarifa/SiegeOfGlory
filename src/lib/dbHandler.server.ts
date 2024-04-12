import { createPool, type Pool, type RowDataPacket } from 'mysql2/promise';
import { env } from '$env/dynamic/private';

let pool: Pool;

// Returns connection to database. Creates pool if not already created
async function getConnection() {
	if (!pool) {
		pool = createPool(env.DATABASE_CREDENTAILS);
	}

	const conn = await pool.getConnection();
	return conn;
}

// Closes pool if it exists
export function closePool() {
	if (pool) {
		console.log('Closing DB Pool');
		pool
			.end()
			.then(() => {
				console.log('DB Pool Closed');
				process.exit(0);
			})
			.catch(() => {
				console.error('Pool did not Close');
				process.exit(1);
			});
	} else {
		process.exit(0);
	}
}

// Returns Bool Based on if user is in db
export async function checkIfUserExists(uid: string) {
	// Structure of data to be returned by query
	interface Return extends RowDataPacket {
		uid: string;
	}

	const query = 'SELECT userId FROM sog_users WHERE userId = ?';
	let check = false;
	const conn = await getConnection();

	try {
		const [results] = await conn.execute<Return[]>(query, [uid]);
		if (results) {
			// Sets check to true is data returned (Meaning that user does exist)
			check = results.length > 0;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
	return check;
}

// Checks if rainbow account not already in use and adds user is not
export async function createUser(uid: string, username: string, rainbowId: string) {
	interface Return extends RowDataPacket {
		inserted: number;
	}

	const query = 'CALL sog_createUser(?,?,?)';

	const conn = await getConnection();

	try {
		const [[results]] = await conn.execute<[Return[]]>(query, [uid, username, rainbowId]);
		return !!results[0].inserted;
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Gets Wins,Losses & Current Amount of battles for home page
export async function getHomePageStats(uid: string) {
	interface Return1 extends RowDataPacket {
		username: string;
		wins: number;
		losses: number;
		ongoing: number;
	}

	interface Return2 extends RowDataPacket {
		userId: string;
		opponentName: string;
		statType: string;
		startDate: string;
	}

	const query = 'CALL sog_homePage(?)';

	const conn = await getConnection();

	try {
		const [results] = await conn.execute<[Return1[], Return2[]]>(query, [uid]);
		if (results) {
			return { stats: results[0][0], battles: results[1] };
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Gets all users for search page
export async function getAllUsers(uid: string) {
	interface Return extends RowDataPacket {
		userId: string;
		username: string;
	}

	const query = 'CALL sog_userSearch(?);';

	const conn = await getConnection();

	try {
		const [[results]] = await conn.execute<[Return[]]>(query, [uid]);
		if (results && results.length > 0) {
			return results;
		} else {
			return [];
		}
	} catch (e) {
		console.log(e);
		return [];
	} finally {
		await conn.release();
	}
}

// Gets all friends for friends page
export async function getFriends(uid: string) {
	interface Return extends RowDataPacket {
		username: string;
		userId: string;
		battle: number;
	}

	const query = 'CALL sog_getFriends(?)';

	const conn = await getConnection();

	try {
		const [results] = await conn.execute<[Return[]]>(query, [uid]);
		if (results) {
			return results[0];
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Gets all requests received and sent for requests page
export async function getRequests(uid: string) {
	interface Return extends RowDataPacket {
		username: string;
		userId: string;
	}

	const query = 'CALL sog_friends_getRequests(?)';

	const conn = await getConnection();

	try {
		const [results] = await conn.execute<[Return[], Return[]]>(query, [uid]);
		if (results) {
			return { requests: results[0], sent: results[1] };
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Sends/Accepts friend request
export async function sendFriendRequest(uid: string, friendId: string) {
	interface Return extends RowDataPacket {
		friendType?: string;
	}

	const query = 'CALL sog_friendships_requests(?,?)';
	const conn = await getConnection();

	try {
		const [[results]] = await conn.execute<[Return[]]>(query, [uid, friendId]);

		if (results && results.length > 0) {
			if (results[0].friendType == 'R' || results[0].friendType == 'F') {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Denies friend request
export async function denyFriendRequest(uid: string, friendId: string) {
	const query = 'DELETE FROM sog_friendships WHERE user1 = ? AND user2 = ?';
	const conn = await getConnection();

	try {
		await conn.execute(query, [friendId, uid]);
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Gets user stats for profile page (Non R6 Stats)
export async function getProfilePageStats(uid: string) {
	interface Return extends RowDataPacket {
		userId: string;
		username: string;
		rainbowId: string;
		wins: number;
		losses: number;
		friendCount: number;
	}

	const query = 'CALL sog_profilePage(?)';

	const conn = await getConnection();

	try {
		const [results] = await conn.execute<[Return[]]>(query, [uid]);
		if (results) {
			return results[0][0];
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Creates battle between two users
export async function startBattle(uid: string, friendId: string, statType: string) {
	interface Return extends RowDataPacket {
		inserted: number;
	}

	const startDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

	const query = 'CALL sog_startBattle(?,?,?,?)';

	const conn = await getConnection();

	try {
		const [results] = await conn.execute<[Return[]]>(query, [uid, friendId, startDate, statType]);
		if (results) {
			return results[0][0].inserted;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Gets Personal Leaderboard
export async function getLeaderboard(uid: string) {
	interface Return extends RowDataPacket {
		userId: string;
		row: number;
		username: string;
		wins: number;
		losses: number;
	}

	const query = 'CALL sog_getLeaderboard(?)';

	const conn = await getConnection();

	try {
		const [results] = await conn.execute<[Return[]]>(query, [uid]);
		if (results) {
			return results[0];
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Gets all completed battles for checking
export async function getFinishedBattles() {
	interface Return extends RowDataPacket {
		user1: string;
		user2: string;
		user1R: string;
		user2R: string;
		statType: string;
		startDate: string;
	}

	const date = new Date().toISOString().split('T')[0];

	const query =
		'SELECT user1, user2, \
		(SELECT rainbowId FROM sog_users WHERE userId = user1) AS user1R, \
		(SELECT rainbowId FROM sog_users WHERE userId = user2) AS user2R, \
		 statType, startDate FROM sog_battles WHERE completed = 0 AND startDate < ?';

	const conn = await getConnection();

	try {
		const [results] = await conn.execute<Return[]>(query, [date]);
		if (results) {
			return results;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Completes battle and updates user stats
export async function completeBattle(
	user1: string,
	user2: string,
	winner: number,
	stat1: number,
	stat2: number
) {
	const query = 'CALL sog_completeBattle(?,?,?,?,?)';

	const conn = await getConnection();

	try {
		await conn.execute(query, [user1, user2, winner, stat1, stat2]);
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}

// Gets all previous battles for history page
export async function getHistory(uid: string) {
	interface Return extends RowDataPacket {
		userId: string;
		opponentName: string;
		statType: string;
		startDate: string;
		stat1: number;
		stat2: number;
	}

	const query = 'CALL sog_battleHistory(?)';

	const conn = await getConnection();

	try {
		const [results] = await conn.execute<[Return[]]>(query, [uid]);
		if (results) {
			return results[0];
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.release();
	}
}
