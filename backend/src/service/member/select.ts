import db from '@config/database';
import { RowDataPacket } from 'mysql2';

// 모든 멤버 목록 조회
export const selectMembers = async () => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT member_id as memberId, group_id as groupId, name
    FROM MemberData
    ORDER BY group_id`;

    return await con.query(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 특정 멤버 상세 정보 확인
export const selectMemberDetail = async (memberId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT M.member_id as memberId, M.group_id as groupId, M.name,
    (SELECT COUNT(*) FROM Photocard as P WHERE P.member_id=M.member_id) as photoCount
    FROM MemberData as M
    WHERE M.member_id=${con.escape(memberId)}`;

    interface DataType extends RowDataPacket {
      memberId: number;
      groupId: number;
      name: string;
      photoCount: number;
    }

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 특정 그룹의 모든 멤버 조회
export const selectMembersOfGroup = async (groupId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT M.group_id as groupId, M.member_id as memberId, M.name,
    (SELECT COUNT(*) FROM Photocard as P WHERE P.member_id=M.member_id) as photoCount
    FROM MemberData as M
    WHERE M.group_id=${con.escape(groupId)}`

    return await con.query(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}