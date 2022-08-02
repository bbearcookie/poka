import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// 포토카드 목록 조회
export const selectPhotoList = async () => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT P.photocard_id, P.member_id, P.name, P.image_name,
    G.group_id, G.name as group_name, M.name as member_name
    FROM Photocard as P
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    ORDER BY photocard_id`;

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