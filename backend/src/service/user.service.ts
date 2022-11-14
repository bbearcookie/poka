import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { makeSalt, encryptText } from '@util/encrypt';

export interface UserType extends RowDataPacket {
  user_id: number;
  username: string;
  nickname: string;
  password: string;
  salt: string;
  role: string;
  strategy: string;
  registered_time: string;
  image_name: string;
}

// 아이디 이름으로 사용자 상세 조회
export const selectUserDetailByUsername = async (username: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT user_id, username, nickname, password, salt, role, strategy, registered_time, image_name
    FROM User
    WHERE username=${con.escape(username)}`;

    return await con.query<UserType[]>(sql);
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
    SELECT user_id, username, nickname, password, salt, role, strategy, registered_time, image_name
    FROM User
    WHERE user_id=${con.escape(userId)}`;

    return await con.query<UserType[]>(sql);
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

// 해당 사용자의 모든 배송정보 조회
export const selectUserShippingAddressList = async (userId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT id, user_id, name, recipient, contact, postcode, address, address_detail, requirement
    FROM ShippingAddress
    WHERE user_id = ${con.escape(userId)}`;

    interface DataType extends RowDataPacket {
      id: number;
      user_id: number;
      name: string;
      recipient: string;
      contact: string;
      postcode: string;
      address: string;
      address_detail: string;
      requirement: string;
    }

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송정보 추가
export const insertShippingAddress = async (
  userId: number,
  name: string,
  recipient: string,
  contact: string,
  postcode: string,
  address: string,
  address_detail: string,
  requirement: string
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    INSERT INTO ShippingAddress 
    (user_id, name, recipient, contact, postcode, address, address_detail, requirement)
    VALUES (
      ${con.escape(userId)}, 
      ${con.escape(name)}, 
      ${con.escape(recipient)}, 
      ${con.escape(contact)}, 
      ${con.escape(postcode)}, 
      ${con.escape(address)}, 
      ${con.escape(address_detail)}, 
      ${con.escape(requirement)}
    )`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}