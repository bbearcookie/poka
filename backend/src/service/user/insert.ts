import db from '@config/database';
import { makeSalt, encryptText } from '@util/encrypt';

// 사용자 데이터 추가
export const insertUser = async (username: string, nickname: string, password: string) => {
  const con = await db.getConnection();

  try {
    const salt = makeSalt(32);
    const encryptedPassword = encryptText(password, salt);
    
    let sql = `
    INSERT INTO User(
      username,
      nickname,
      password,
      salt
    ) VALUES (
      ${con.escape(username)},
      ${con.escape(nickname)},
      ${con.escape(encryptedPassword)},
      ${con.escape(salt)}
    )`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}