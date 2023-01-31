import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { ShippingAddressType } from '@type/user';

// 해당 사용자의 모든 배송지 조회
export const selectUserShippingAddressList = async (userId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT address_id as addressId, user_id as userId, name, recipient, contact, postcode, address, address_detail, requirement, prime
    FROM ShippingAddress
    WHERE user_id=${con.escape(userId)}
    ORDER BY prime DESC, address_id`;

    interface DataType extends ShippingAddressType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 정보 상세 조회
export const selectUserShippingAddressDetail = async (addressId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT address_id as addressId, user_id as userId, name, recipient, contact, postcode, address, address_detail, requirement, prime
    FROM ShippingAddress
    WHERE address_id=${con.escape(addressId)}`;

    interface DataType extends ShippingAddressType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 추가
export const insertShippingAddress = async (
  userId: number,
  { form }: { form: {
    name: string;
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
    prime: string;
  }
}) => {
  const con = await db.getConnection();

  try {
    let sql = `
    INSERT INTO ShippingAddress 
    (user_id, name, recipient, contact, postcode, address, address_detail, requirement, prime)
    VALUES (
      ${con.escape(userId)}, 
      ${con.escape(form.name)}, 
      ${con.escape(form.recipient)}, 
      ${con.escape(form.contact)}, 
      ${con.escape(form.postcode)}, 
      ${con.escape(form.address)}, 
      ${con.escape(form.addressDetail)}, 
      ${con.escape(form.requirement)}, 
      ${con.escape(form.prime)}
    )`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 수정
export const updateShippingAddress = async (
  addressId: number,
  { form }: { form: {
    name: string;
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
  }
}) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE ShippingAddress
    SET name=${con.escape(form.name)},
    recipient=${con.escape(form.recipient)},
    contact=${con.escape(form.contact)},
    postcode=${con.escape(form.postcode)},
    address=${con.escape(form.address)},
    address_detail=${con.escape(form.addressDetail)},
    requirement=${con.escape(form.requirement)}
    WHERE address_id=${con.escape(addressId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 특정 사용자의 기본 배송지 모두 해제
export const updateUserShippingAddressPrimeFalse = async (userId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE ShippingAddress
    SET prime='false'
    WHERE user_id=${con.escape(userId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 기본 배송지 정보 변경
export const updateShippingAddressPrime = async (addressId: number, prime: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE ShippingAddress
    SET prime=${con.escape(prime)}
    WHERE address_id=${con.escape(addressId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 삭제
export const deleteShippingAddress = async (addressId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `DELETE FROM ShippingAddress WHERE address_id=${con.escape(addressId)}`;
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}