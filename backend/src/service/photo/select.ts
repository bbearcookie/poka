import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { PhotoType } from '@type/photo';
import { WhereSQL } from '@util/database';
import { FilterType } from '@controller/photo/getPhotos';

// 포토카드 목록 조회
export const selectPhotos = 
  async (itemPerPage: number = 20, pageParam: number, filter: FilterType) => {
    const con = await db.getConnection();

    try {
      const where = new WhereSQL();

      let sql = `
      SELECT P.photocard_id as photocardId, P.name, P.image_name as imageName,
      G.group_id as groupId, G.name as groupName,
      M.member_id as memberId, M.name as memberName
      FROM Photocard as P
      INNER JOIN MemberData as M ON P.member_id=M.member_id
      INNER JOIN GroupData as G ON M.group_id=G.group_id `;

      // 포토카드 이름 조건
      if (filter.photoName.length > 0) {
        where.pushString('(');
        filter.photoName.forEach((item, idx) => {
          where.push({
            query: `P.name LIKE ${con.escape(`%${item}%`)}`,
            operator: idx < filter.photoName.length - 1 ? 'OR' : ''
          });
        });
        where.push({
          query: ')',
          operator: 'AND'
        });
      }

      // 그룹ID 조건
      if (filter.groupId.length > 0) {
        where.push({
          query: `G.group_id IN (${con.escape(filter.groupId)})`,
          operator: 'AND'
        });
      }

      // 멤버ID 조건
      if (filter.memberId.length > 0) {
        where.push({
          query: `M.member_id IN (${con.escape(filter.memberId)})`,
          operator: 'AND'
        })
      }

      // 조건 처리
      sql += where.toString();
      sql += `ORDER BY photocard_id `;

      // 페이지 조건
      sql += `LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

      interface DataType extends PhotoType, RowDataPacket {}

      return await con.query<DataType[]>(sql);
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
    SELECT P.photocard_id as photocardId, P.name, P.image_name as imageName,
    G.group_id as groupId, G.name as groupName,
    M.member_id as memberId, M.name as memberName
    FROM Photocard as P
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE photocard_id=${con.escape(photocardId)}`;

    interface DataType extends PhotoType, RowDataPacket {}

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}