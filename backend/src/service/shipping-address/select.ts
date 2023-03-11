import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { ShippingAddressType } from '@type/shipping';

// 특정 사용자의 모든 배송지 조회
export const selectUserShippingAddresses = async (userId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT address_id as addressId, user_id as userId, name, recipient, contact, postcode, address, address_detail as addressDetail, requirement, prime
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

// 배송지 정보 상세 조회
export const selectShippingAddressDetail = async (addressId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT address_id as addressId, user_id as userId, name, recipient, contact, postcode, address, address_detail as addressDetail, requirement, prime
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