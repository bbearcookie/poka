import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { AddressForm } from '@validator/chain/address';

// 사용자 배송지 추가
export const insertUserShippingAddress = async (
  userId: number,
  form: AddressForm
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    INSERT INTO ShippingAddress(
      user_id,
      name,
      recipient,
      contact,
      postcode,
      address,
      address_detail,
      requirement,
      prime
    ) VALUES (
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
    con?.release();
  }
}