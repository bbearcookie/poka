import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { makeSalt, encryptText } from '@util/encrypt';
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

// 사용자 데이터 추가
export const insertUser = async (username: string, nickname: string, password: string) => {
  const con = await db.getConnection();

  try {
    const salt = makeSalt(32);
    const encryptedPassword = encryptText(password, salt);
    
    let sql = `
    INSERT INTO User (username, nickname, password, salt)
    VALUES (${con.escape(username)}, ${con.escape(nickname)}, ${con.escape(encryptedPassword)}, ${con.escape(salt)})`
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 프로필 수정
export const updateUserProfile = async (userId: number, nickname: string, imageName: string | undefined) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE User
    SET nickname=${con.escape(nickname)} `;
    if (imageName) sql += `, image_name=${con.escape(imageName)} `;
    sql += `WHERE user_id=${con.escape(userId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}