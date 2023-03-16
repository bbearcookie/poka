import db from '@config/database';

// 멤버 데이터 삭제
export const deleteMember = async (memberId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    DELETE FROM MemberData
    WHERE member_id=${con.escape(memberId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}