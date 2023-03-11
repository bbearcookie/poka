import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { UserType } from '@type/user';

// 아이디 이름으로 사용자 상세 조회
export const selectUserDetailByUsername = async (username: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT user_id as userId, username, nickname, password, salt, role, strategy, registered_time as registeredTime, image_name as imageName
    FROM User
    WHERE username=${con.escape(username)}`;

    interface DataType extends UserType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
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
    SELECT user_id as userId, username, nickname, password, salt, role, strategy, registered_time as registeredTime, image_name as imageName
    FROM User
    WHERE user_id=${con.escape(userId)}`;

    interface DataType extends UserType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}