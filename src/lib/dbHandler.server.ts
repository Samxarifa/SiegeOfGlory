import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

// Returns Bool Based on if user is in db
export async function checkIfUserExists(uid: string) {
	// Structure of data to be returned by query
	interface Return extends mysql.RowDataPacket {
		uid: string;
	}

	const query = 'SELECT userId FROM sog_users WHERE userId = ?';
	let check = false;
	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [results] = await conn.execute<Return[]>(query, [uid]);
		if (results) {
			// Sets check to true is data returned (Meaning that user does exist)
			check = results.length > 0;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.end();
	}
	return check;
}

// Checks if rainbow account not already in use and adds user is not
export async function createUser(uid: string, username: string, rainbowId: string) {
	interface Return extends mysql.RowDataPacket {
		inserted: number;
	}

	const query = 'CALL sog_createUser(?,?,?)';

	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [[results]] = await conn.execute<Return[][]>(query, [uid, username, rainbowId]);
		return !!results[0].inserted;
	} catch (e) {
		console.log(e);
	} finally {
		await conn.end();
	}
}

// Gets Wins,Losses & Current Amount of battles for home page
export async function getHomePageStats(uid: string) {
	interface Return extends mysql.RowDataPacket {
		wins: number;
		ongoing: number;
		losses: number;
	}

	const query =
		"SELECT wins,losses, COUNT(*) as 'ongoing' " +
		'FROM sog_users, sog_battles ' +
		'WHERE completed = 0 ' +
		'AND (sog_users.userId = sog_battles.user1 OR sog_users.userId = sog_battles.user2) ' +
		'AND userId = ?;';

	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [results] = await conn.execute<Return[]>(query, [uid]);
		if (results) {
			return results[0];
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.end();
	}
}

export async function getCurrentBattles(uid: string) {
	interface Return extends mysql.RowDataPacket {
		opponentName: string;
		statType: string;
		startTime: string;
	}

	const query =
		'SELECT username AS "opponentName", statType, startTime \
		FROM sog_users, sog_battles \
		WHERE userId = IF(user1 = ?, user2, user1)';

	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [results] = await conn.execute<Return[]>(query, [uid]);
		if (results) {
			return results;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.end();
	}
}

export async function getAllUsers(uid: string) {
	interface Return extends mysql.RowDataPacket {
		userId: string;
		username: string;
	}

	// const query = 'SELECT userId, username FROM sog_users;';
	const query = 'CALL sog_userSearch(?);';

	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [[results]] = await conn.execute<Return[][]>(query, [uid]);
		if (results && results.length > 0) {
			return results;
		} else {
			return [];
		}
	} catch (e) {
		console.log(e);
		return [];
	} finally {
		await conn.end();
	}
}

export async function getFriends(uid: string) {
	interface Return extends mysql.RowDataPacket {
		username: string;
		userId: string;
	}

	const query =
		'SELECT username, userId \
		FROM sog_friendships f, sog_users u \
		WHERE (user1 = ? OR user2 = ?) \
		AND userId = IF(user1 = ?, user2,user1) \
		AND friendshipType = "F"';

	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [results] = await conn.execute<Return[]>(query, [uid, uid, uid]);
		if (results) {
			return results;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.end();
	}
}

export async function getRequests(uid: string) {
	interface Return extends mysql.RowDataPacket {
		username: string;
		userId: string;
	}

	const query = 'CALL sog_friends_getRequests(?)';

	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [results] = await conn.execute<[Return[], Return[]]>(query, [uid]);
		if (results) {
			return { requests: results[0], sent: results[1] };
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.end();
	}
}

export async function sendFriendRequest(uid: string, friendId: string) {
	interface Return extends mysql.RowDataPacket {
		friendType?: string;
	}

	const query = 'CALL sog_friendships_requests(?,?)';
	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [[results]] = await conn.execute<Return[][]>(query, [uid, friendId]);

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
	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		await conn.execute(query, [friendId, uid]);
	} catch (e) {
		console.log(e);
	} finally {
		conn.end();
	}
}
