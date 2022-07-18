import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// 그룹 목록 조회
export const selectAllGroupList = async () => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT G.group_id, G.name, G.image_name,
    (SELECT COUNT(*) FROM MemberData as M WHERE M.group_id=G.group_id) as member_cnt
    FROM GroupData AS G`

    return await con.query(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 그룹 상세 조회
export const selectGroupDetail = async (groupId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT group_id, name, image_name
    FROM GroupData
    WHERE group_id=${con.escape(groupId)}`

    interface DataType extends RowDataPacket {
      group_id: number;
      name: string;
      image_name: string;
    }

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 그룹 데이터 추가
export const insertGroup = async (name: string) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();

    let sql = `
    INSERT INTO GroupData (name)
    VALUES (${con.escape(name)})`;

    const [result] = await con.execute(sql);
    const insertId = (result as ResultSetHeader).insertId;

    con.commit();
    return insertId;
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
};

// 그룹 데이터 수정
export const updateGroup = async (groupId: number, name: string, imageName: string | undefined) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE GroupData
    SET name=${con.escape(name)} `;
    if (imageName) sql += `, image_name=${con.escape(imageName)} `;
    sql += `WHERE group_id=${con.escape(groupId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
};

// 그룹 이미지 파일 이름 변경 적용
export const updateImagename = async (groupId: number, imageName: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE GroupData
    SET image_name=${con.escape(imageName)}
    WHERE group_id=${con.escape(groupId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }

};