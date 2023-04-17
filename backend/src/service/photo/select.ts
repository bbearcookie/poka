import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
import { Photo } from '@type/photo';
import { WhereSQL, parseJsonObject } from '@util/database';
import { FilterType } from '@controller/photo/getPhotos';

// 포토카드 목록 조회
export const selectPhotos = async (itemPerPage: number, pageParam: number, filter: FilterType) => {
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
    if (filter.photoNames.length > 0) {
      where.pushString('(');
      for (let i = 0; i < filter.photoNames.length; i++) {
        where.push({
          query: `P.name LIKE ${con.escape(`%${filter.photoNames[i]}%`)}`,
          operator: i < filter.photoNames.length - 1 ? 'OR' : '',
        });
      }
      where.push({
        query: ')',
        operator: 'AND',
      });
    }

    // 그룹ID 조건
    if (filter.groupIds.length > 0) {
      where.push({
        query: `G.group_id IN (${con.escape(filter.groupIds)})`,
        operator: 'AND',
      });
    }

    // 멤버ID 조건
    if (filter.memberIds.length > 0) {
      where.push({
        query: `M.member_id IN (${con.escape(filter.memberIds)})`,
        operator: 'AND',
      });
    }

    // 조건 처리
    sql += where.toString();
    sql += `
    ORDER BY photocard_id
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    let result = await con.query<Photo[] & ResultSetHeader>(sql);
    result[0] = parseJsonObject(result[0], 'groupData', 'memberData') as Photo[] & ResultSetHeader;
    return result;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};

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

    let result = await con.query<Photo[] & ResultSetHeader>(sql);
    result[0] = parseJsonObject(result[0], 'groupData', 'memberData') as Photo[] & ResultSetHeader;
    return result;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};

// 특정 멤버의 포토카드 이미지 이름 조회
export const selectPhotoImagenameOfMember = async (memberId: number | number[]) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let where;
    if (Array.isArray(memberId)) where = `WHERE member_id IN (${con.escape(memberId)})`;
    else where = `WHERE member_id = ${con.escape(memberId)}`;

    let sql = `
    SELECT
      image_name as imageName
    FROM Photocard
    ${where} AND image_name IS NOT NULL`;

    return await con.query<Pick<Photo, 'imageName'>[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};

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

    let result = await con.query<Photo[] & ResultSetHeader>(sql);
    result[0] = parseJsonObject(result[0], 'groupData', 'memberData') as Photo[] & ResultSetHeader;
    return result;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};
