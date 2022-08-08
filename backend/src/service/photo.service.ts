import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { RefinedFilterType } from '@controller/photo.ctrl';
import { WhereSQL } from '@util/database';

// 포토카드 목록 조회
export const selectPhotoList = 
  async (limit: number, pageParam: number, filters: RefinedFilterType) => {
    const con = await db.getConnection();

    try {
      const where = new WhereSQL();

      let sql = `
      SELECT P.photocard_id, P.member_id, P.name, P.image_name,
      G.group_id, G.name as group_name, M.name as member_name
      FROM Photocard as P
      INNER JOIN MemberData as M ON P.member_id=M.member_id
      INNER JOIN GroupData as G ON M.group_id=G.group_id `;

      // 포토카드 이름 조건
      if (filters['PHOTO_NAME'].length > 0) {
        where.pushString('(');
        filters['PHOTO_NAME'].forEach((item, idx) => {
          where.push({
            query: `P.name LIKE ${con.escape(`%${item}%`)}`,
            operator: idx < filters['PHOTO_NAME'].length - 1 ? 'OR' : ''
          });
        });
        where.push({
          query: ')',
          operator: 'AND'
        });
      }

      // 그룹ID 조건
      if (filters['GROUP_ID'].length > 0) {
        where.push({
          query: `G.group_id IN (${con.escape(filters['GROUP_ID'])})`,
          operator: 'AND'
        });
      }

      // 멤버ID 조건
      if (filters['MEMBER_ID'].length > 0) {
        where.push({
          query: `M.member_id IN (${con.escape(filters['MEMBER_ID'])})`,
          operator: 'AND'
        })
      }
      sql += where.toString();
      sql += `ORDER BY photocard_id `;

      // 페이지 조건
      if (limit) sql += `LIMIT ${con.escape(limit)} OFFSET ${con.escape(pageParam)}`;

      return await con.query(sql);
    } catch (err) {
      con.rollback();
      throw err;
    } finally {
      con.release();
    }
}

// 포토카드 상세 조회
export const selectPhotoDetail = async (photocardId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT P.photocard_id, P.member_id, P.name, P.image_name,
    G.group_id, G.name as group_name, M.member_id, M.name as member_name
    FROM Photocard as P
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE photocard_id=${con.escape(photocardId)}`;

    interface DataType extends RowDataPacket {
      photocard_id: number;
      group_id: number;
      name: string;
      group_name: string;
      member_name: string;
      image_name: string;
    }

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 포토카드 데이터 추가
export const insertPhotos = 
  async (memberId: number, names: string[]) => {
    const con = await db.getConnection();

    try {
      await con.beginTransaction();

      const insertIds: number[] = [];
      for (let name of names) {
        let sql = `
        INSERT INTO Photocard (member_id, name)
        VALUES (${con.escape(memberId)}, ${con.escape(name)})`;

        const [result] = await con.execute(sql);
        const insertId = (result as ResultSetHeader).insertId;
        insertIds.push(insertId);
      }

      con.commit();
      return insertIds;
    } catch (err) {
      con.rollback();
      throw err;
    } finally {
      con.release();
    }
};

// 포토카드 데이터 수정
export const updatePhoto = async (
  photocardId: number, memberId: number,
  name: string, imageName: string | undefined) => {
    const con = await db.getConnection();

    try {
      let sql = `
      UPDATE Photocard
      SET member_id=${con.escape(memberId)}, 
      name=${con.escape(name)} `; 
      if (imageName) sql += `, image_name=${con.escape(imageName)} `;
      sql += `WHERE photocard_id=${con.escape(photocardId)}`;

      return await con.execute(sql);
    } catch (err) {
      throw err;
    } finally {
      con.release();
    }

};

// 포토카드 이미지 파일 이름 변경 적용
export const updateImagename = async (photocardId: number, imageName: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE Photocard
    SET image_name=${con.escape(imageName)}
    WHERE photocard_id=${con.escape(photocardId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

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