import mysql from 'mysql2/promise';
import { DATABASE_CREDENTAILS } from '$env/static/private';

// Returns Bool Based on if user is in db
export async function checkIfUserExists(uid: string) {
	// Structure of data to be returned by query
	interface Return extends mysql.RowDataPacket {
		uid: string;
	}

	const query = 'SELECT userId FROM sog_users WHERE userId = ?';
	let check = false;
	const conn = await mysql.createConnection(JSON.parse(DATABASE_CREDENTAILS));

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

	const conn = await mysql.createConnection(JSON.parse(DATABASE_CREDENTAILS));

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
		'WHERE completed = 1 ' +
		'AND (sog_users.userId = sog_battles.user1 OR sog_users.userId = sog_battles.user2) ' +
		'AND userId = ?;';

	const conn = await mysql.createConnection(JSON.parse(DATABASE_CREDENTAILS));

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
		timeStarted: string;
	}

	const query =
		"SELECT (SELECT username \
			FROM sog_users \
			WHERE userId = IF(user1 = ?, user2, user1)) \
		AS 'opponentName', statType, timeStarted \
		FROM sog_battles \
		WHERE user1 = ? \
		OR user2 = ?;";

	const conn = await mysql.createConnection(JSON.parse(DATABASE_CREDENTAILS));

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
