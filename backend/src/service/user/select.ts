import db from '@config/database';
import { ResultSetHeader } from 'mysql2';
import { UserDetail } from '@type/user';

// 아이디 이름으로 사용자 상세 조회
export const selectUserDetailByUsername = async (username: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT
      user_id as userId,
      username,
      nickname,
      password,
      salt,
      role,
      strategy,
      registered_time as registeredTime,
      image_name as imageName
    FROM User
    WHERE username=${con.escape(username)}`;

    return await con.query<UserDetail[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// PK로 사용자 상세 조회
export const selectUserDetailByUserID = async (userId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT
      user_id as userId,
      username,
      nickname,
      password,
      salt,
      role,
      strategy,
      registered_time as registeredTime,
      image_name as imageName
    FROM User
    WHERE user_id=${con.escape(userId)}`;

    return await con.query<UserDetail[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}