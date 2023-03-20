import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
import { Photo } from '@type/photo';
import { WhereSQL } from '@util/database';
import { FilterType } from '@controller/photo/getPhotos';

// 포토카드 목록 조회
export const selectPhotos = async (
  itemPerPage: number,
  pageParam: number,
  filter: FilterType
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    const where = new WhereSQL();

    let sql = `
    SELECT
      P.photocard_id as photocardId,
      P.name,
      P.image_name as imageName,
      JSON_OBJECT(
        'memberId', M.member_id,
        'name', M.name
      ) as memberData,
      JSON_OBJECT(
        'groupId', G.group_id,
        'name', G.name
      ) as groupData
    FROM Photocard as P
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id `;

    // 포토카드 이름 조건
    if (filter.photoName.length > 0) {
      where.pushString('(');
      for (let i = 0; i < filter.photoName.length; i++) {
        where.push({
          query: `P.name LIKE ${con.escape(`%${filter.photoName[i]}%`)}`,
          operator: i < filter.photoName.length - 1 ? 'OR' : ''
        });
      }
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
    sql += `
    ORDER BY photocard_id
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    return await con.query<Photo[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}

// 포토카드 상세 조회
export const selectPhotoDetail = async (photocardId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    SELECT
      P.photocard_id as photocardId,
      P.name,
      P.image_name as imageName,
      JSON_OBJECT(
        'memberId', M.member_id,
        'name', M.name
      ) as memberData,
      JSON_OBJECT(
        'groupId', G.group_id,
        'name', G.name
      ) as groupData
    FROM Photocard as P
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE photocard_id=${con.escape(photocardId)}`;

    return await con.query<Photo[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}

// 교환글이 원하는 포토카드 목록 조회
export const selectWantCardsOfTrade = async (tradeId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    SELECT
      P.photocard_id as photocardId,
      P.name as name,
      P.image_name as imageName,
      JSON_OBJECT(
        'memberId', M.member_id,
        'name', M.name
      ) as memberData,
      JSON_OBJECT(
        'groupId', G.group_id,
        'name', G.name
      ) as groupData
    FROM TradeWantcard as W
    INNER JOIN Photocard as P ON W.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE W.trade_id=${con.escape(tradeId)}`;

    return await con.query<Photo[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}