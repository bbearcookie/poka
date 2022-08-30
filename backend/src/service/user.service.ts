import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { makeSalt, encryptText } from '@util/encrypt';

// 사용자 상세 조회
export const selectUserDetailByUsername = async (username: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT user_id, username, nickname, password, salt, role, strategy, registered_time
    FROM User
    WHERE username=${con.escape(username)}`;

    interface DataType extends RowDataPacket {
      user_id: number;
      username: string;
      nickname: string;
      password: string;
      salt: string;
      role: string;
      strategy: string;
      registered_time: string;
    }

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 데이터 추가
export const insertUser = async (username: string, nickname: string, password: string) => {
  const con = await db.getConnection();

  try {
    const salt = makeSalt();
    const encryptedPassword = encryptText(password, salt);
    let sql = `
    INSERT INTO User (username, nickname, password, salt)
    VALUES (${con.escape(username)}, ${con.escape(nickname)}, ${con.escape(encryptedPassword)}, ${con.escape(salt)})
    `
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}