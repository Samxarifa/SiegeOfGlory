import mysql from 'mysql2/promise';
import { DATABASE_CREDENTAILS } from '$env/static/private';

export async function checkIfUserExists(uid: string) {
	interface Return extends mysql.RowDataPacket {
		uid: string;
	}

	const query = 'SELECT userId FROM sog_users WHERE userId = ?';
	let check = false;
	const conn = await mysql.createConnection(JSON.parse(DATABASE_CREDENTAILS));

	try {
		const [results] = await conn.execute<Return[]>(query, [uid]);
		if (results) {
			check = results.length > 0;
		}
	} catch (e) {
		console.log(e);
	} finally {
		await conn.end();
	}
	return check;
}

export async function createUser(uid: string, username: string, rainbowId: string) {
	interface Return extends mysql.RowDataPacket {
		rainbowId: string;
	}

	const insertQuery =
		'INSERT INTO sog_users (userId, username, rainbowId, wins, losses) VALUES (?,?,?,0,0)';

	const selectQuery = 'SELECT rainbowId FROM sog_users WHERE rainbowId = ?';

	const conn = await mysql.createConnection(JSON.parse(DATABASE_CREDENTAILS));

	const [results] = await conn.execute<Return[]>(selectQuery, [rainbowId]);

	if (!results || results.length == 0) {
		try {
			await conn.execute(insertQuery, [uid, username, rainbowId]);
		} catch (e) {
			console.log(e);
		} finally {
			await conn.end();
		}
		return true;
	} else {
		await conn.end();
		return false;
	}
}

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
