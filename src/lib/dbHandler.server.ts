import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

export interface AllUserReturn extends mysql.RowDataPacket {
	userId: string;
	username: string;
}

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
		rainbowId: string;
	}

	const insertQuery =
		'INSERT INTO sog_users (userId, username, rainbowId, wins, losses) VALUES (?,?,?,0,0)';

	const selectQuery = 'SELECT rainbowId FROM sog_users WHERE rainbowId = ?';

	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	// Query db to see if r6 account in use
	const [results] = await conn.execute<Return[]>(selectQuery, [rainbowId]);

	if (!results || results.length == 0) {
		// If r6 account not in use, inserts new user
		try {
			await conn.execute(insertQuery, [uid, username, rainbowId]);
		} catch (e) {
			console.log(e);
		} finally {
			await conn.end();
		}
		// Returns true if user was added (r6 account NOT in db already)
		return true;
	} else {
		await conn.end();
		// Returns false if user was NOT added (r6 account in db already)
		return false;
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
	const query = 'SELECT userId, username FROM sog_users WHERE userId != ?';

	const conn = await mysql.createConnection(JSON.parse(env.DATABASE_CREDENTAILS));

	try {
		const [results] = await conn.execute<AllUserReturn[]>(query, [uid]);
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
		FROM sog_users, sog_friendships \
		WHERE userId = IF(user1 = ?, user2, user1) \
		AND friendshipType = "F";';

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

export async function getRequests(uid: string) {
	interface Return extends mysql.RowDataPacket {
		username: string;
		userId: string;
	}

	const query =
		'SELECT username, userId \
		FROM sog_users, sog_friendships \
		WHERE userId = IF(user1 = ?, user2, user1) \
		AND friendshipType = "R";';

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
