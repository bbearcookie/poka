import db from '@config/database';

// 사용자 배송지 삭제
export const deleteShippingAddress = async (addressId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    DELETE FROM ShippingAddress
    WHERE address_id=${con.escape(addressId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}