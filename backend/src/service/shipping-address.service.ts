import db from '@config/database';
import { RowDataPacket } from 'mysql2';

interface ShippingAddressType extends RowDataPacket {
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

// 해당 사용자의 모든 배송지 조회
export const selectUserShippingAddressList = async (userId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT id, user_id, name, recipient, contact, postcode, address, address_detail, requirement
    FROM ShippingAddress
    WHERE user_id=${con.escape(userId)}
    ORDER BY id`;

    return await con.query<ShippingAddressType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 정보 상세 조회
export const selectUserShippingAddressDetail = async (id: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT id, user_id, name, recipient, contact, postcode, address, address_detail, requirement
    FROM ShippingAddress
    WHERE id=${con.escape(id)}`;

    return await con.query<ShippingAddressType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 추가
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

// 사용자 배송지 삭제
export const deleteShippingAddress = async (id: number) => {
  const con = await db.getConnection();

  try {
    let sql = `DELETE FROM ShippingAddress WHERE id=${con.escape(id)}`;
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}