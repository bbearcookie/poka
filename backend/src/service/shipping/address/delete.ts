import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 사용자 배송지 삭제
export const deleteShippingAddress = async (addressId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    DELETE FROM ShippingAddress
    WHERE address_id=${con.escape(addressId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}