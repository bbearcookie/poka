import db from '@config/database';

// 멤버 정보 수정
export const updateMember = async (memberId: number, name: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE MemberData
    SET name=${con.escape(name)}
    WHERE member_id=${con.escape(memberId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}