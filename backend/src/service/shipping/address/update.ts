import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 사용자 배송지 수정
export const updateShippingAddress = async (
  addressId: number,
  form : {
    name: string;
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
  }
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    UPDATE ShippingAddress
    SET
      name=${con.escape(form.name)},
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
    con?.release();
  }
}

// 특정 사용자의 기본 배송지 모두 해제
export const updateUserShippingAddressPrimeFalse = async (userId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    UPDATE ShippingAddress
    SET
      prime=0
    WHERE user_id=${con.escape(userId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}

// 사용자 기본 배송지 정보 변경
export const updateShippingAddressPrime = async (addressId: number, prime: number) => {
  let con: PoolConnection | undefined;
  
  try {
    con = await db.getConnection();

    let sql = `
    UPDATE ShippingAddress
    SET
      prime=${con.escape(prime)}
    WHERE address_id=${con.escape(addressId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}