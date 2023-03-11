import db from '@config/database';

// 포토카드 데이터 삭제
export const deletePhoto = async (photocardId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `DELETE FROM Photocard WHERE photocard_id=${con.escape(photocardId)}`;
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}