import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
import { User, UserDetail } from '@type/user';

// 비밀번호 미포함 간단한 사용자 정보 조회.
// identifier가 string타입이면 username필드를, number타입이면 user_id 필드를 검사한다.
export const selectUser = async (identifier: string | number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let where;
    if (typeof identifier === 'string') where = `WHERE username=${con.escape(identifier)}`;
    else if (typeof identifier === 'number') where = `WHERE user_id=${con.escape(identifier)}`;
    else throw new Error('selectUser identifier unknown');

    let sql = `
    SELECT
      user_id as userId,
      username,
      nickname,
      image_name as imageName,
      role
    FROM User
    ${where}`;

    return await con.query<User[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};

// 비밀번호를 포함한 사용자 상세 정보 조회.
// identifier가 string타입이면 username필드를, number타입이면 user_id 필드를 검사한다.
export const selectUserDetail = async (identifier: string | number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let where;
    if (typeof identifier === 'string') where = `WHERE username=${con.escape(identifier)}`;
    else if (typeof identifier === 'number') where = `WHERE user_id=${con.escape(identifier)}`;
    else throw new Error('selectUser identifier unknown');

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
    ${where}`;

    return await con.query<UserDetail[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};
