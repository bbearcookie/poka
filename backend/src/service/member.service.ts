import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// 특정 그룹의 모든 멤버 조회
export const selectAllMembersOfGroup = async (groupId: number) => {
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

// 모든 멤버 목록 조회
export const selectAllMemberList = async () => {
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

// 특정 그룹에 멤버 추가
export const insertMember = async (groupId: number, name: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    INSERT INTO MemberData (group_id, name)
    VALUES (${con.escape(groupId)}, ${con.escape(name)})`

    const [result] = await con.execute(sql);
    const insertId = (result as ResultSetHeader).insertId;

    return insertId;
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 특정 멤버 정보 수정
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

// 멤버 데이터 삭제
export const deleteMember = async (memberId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `DELETE FROM MemberData WHERE member_id=${con.escape(memberId)}`;
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}