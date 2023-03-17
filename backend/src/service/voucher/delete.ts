import db from '@config/database';

// 소유권 삭제
export const deleteVoucher = async (voucherId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    DELETE FROM Voucher
    WHERE voucher_id=${con.escape(voucherId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}