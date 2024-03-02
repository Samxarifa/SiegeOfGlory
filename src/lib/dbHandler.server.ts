import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

let pool: mysql.Pool;

async function getConnection() {
	if (!pool) {
		pool = mysql.createPool(env.DATABASE_CREDENTAILS);
	}

	const conn = await pool.getConnection();
	return conn;
}

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
	interface Return extends mysql.RowDataPacket {
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
	interface Return extends mysql.RowDataPacket {
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
	interface Return1 extends mysql.RowDataPacket {
		username: string;
		wins: number;
		losses: number;
		ongoing: number;
	}

	interface Return2 extends mysql.RowDataPacket {
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

export async function getAllUsers(uid: string) {
	interface Return extends mysql.RowDataPacket {
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

export async function getFriends(uid: string) {
	interface Return extends mysql.RowDataPacket {
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

export async function getRequests(uid: string) {
	interface Return extends mysql.RowDataPacket {
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

export async function sendFriendRequest(uid: string, friendId: string) {
	interface Return extends mysql.RowDataPacket {
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
		conn.end();
	}
}

export async function denyFriendRequest(uid: string, friendId: string) {
	const query = 'DELETE FROM sog_friendships WHERE user1 = ? AND user2 = ?';
	const conn = await getConnection();

	try {
		await conn.execute(query, [friendId, uid]);
	} catch (e) {
		console.log(e);
	} finally {
		conn.end();
	}
}

export async function getProfilePageStats(uid: string) {
	interface Return extends mysql.RowDataPacket {
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

export async function startBattle(uid: string, friendId: string, statType: string) {
	interface Return extends mysql.RowDataPacket {
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
