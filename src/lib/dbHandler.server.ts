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

export async function createUser(uid: string, username: string, platform: string) {
	const query =
		'INSERT INTO sog_users (userId, rainbowUsername, rainbowPlatform, wins) VALUES (?,?,?,0)';

	const conn = await mysql.createConnection(JSON.parse(DATABASE_CREDENTAILS));

	try {
		await conn.execute(query, [uid, username, platform]);
	} catch (e) {
		console.log(e);
	} finally {
		await conn.end();
	}
}
