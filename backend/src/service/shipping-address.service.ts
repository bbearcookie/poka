import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { AddressForm } from '@controller/shipping-address.ctrl';

interface ShippingAddressType extends RowDataPacket {
  address_id: number;
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
    SELECT address_id, user_id, name, recipient, contact, postcode, address, address_detail, requirement
    FROM ShippingAddress
    WHERE user_id=${con.escape(userId)}
    ORDER BY address_id`;

    return await con.query<ShippingAddressType[]>(sql);
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
    SELECT address_id, user_id, name, recipient, contact, postcode, address, address_detail, requirement
    FROM ShippingAddress
    WHERE address_id=${con.escape(addressId)}`;

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
    INSERT INTO ShippingAddress 
    (user_id, name, recipient, contact, postcode, address, address_detail, requirement)
    VALUES (
      ${con.escape(userId)}, 
      ${con.escape(form.name)}, 
      ${con.escape(form.recipient)}, 
      ${con.escape(form.contact)}, 
      ${con.escape(form.postcode)}, 
      ${con.escape(form.address)}, 
      ${con.escape(form.addressDetail)}, 
      ${con.escape(form.requirement)}
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