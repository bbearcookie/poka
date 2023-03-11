import db from '@config/database';

// 그룹 데이터 삭제
export const deleteGroup = async (groupId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `DELETE FROM GroupData WHERE group_id=${con.escape(groupId)}`;
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}