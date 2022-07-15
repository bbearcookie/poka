import db from '@config/database';

// 특정 그룹의 모든 멤버 조회
export const selectAllMembersOfGroup = async (groupId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT M.group_id, M.member_id, M.name,
    (SELECT COUNT(*) FROM Photocard as P WHERE P.member_id=M.member_id) as photo_cnt
    FROM MemberData as M
    WHERE M.group_id=${con.escape(groupId)}`

    return await con.query(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}