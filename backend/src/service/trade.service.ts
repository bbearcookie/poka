import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { TradeType, TradeListItemType, WantcardType } from '@type/trade';
import { WhereSQL } from '@util/database';

// 교환글 목록 조회
export const selectTradeList = async (
  groupId: number, memberId: number,
  itemPerPage: number, pageParam: number
) => {
  const con = await db.getConnection();

  try {
    let sql;
    const where = new WhereSQL();

    sql = `
    SELECT T.trade_id, T.user_id, T.voucher_id, T.state, T.amount, T.written_time, T.traded_time,
    P.photocard_id, P.image_name, M.member_id,
    P.name as photo_name, M.name as member_name, G.name as group_name
    FROM Trade as T
    INNER JOIN Voucher as V ON T.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id `;

    // 그룹ID 조건
    if (groupId > 0) {
      where.push({
        query: `M.group_id=${con.escape(groupId)}`,
        operator: 'AND'
      });
    }

    // 멤버ID 조건
    if (memberId > 0) {
      where.push({
        query: `M.member_id=${con.escape(memberId)}`,
        operator: 'OR'
      });
    }

    // 조건 처리
    sql += where.toString();
    sql += `ORDER BY written_time DESC `;

    // 페이지 조건
    sql += `LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    interface TradeDataType extends RowDataPacket, TradeType {}
    const [trades] = await con.query<TradeDataType[]>(sql);

    for (let i = 0; i < trades.length; i++) {
      sql = `
      SELECT M.member_id, M.name
      FROM TradeWantcard as T
      INNER JOIN Photocard as P ON T.photocard_id=P.photocard_id
      INNER JOIN MemberData as M ON P.member_id=M.member_id
      WHERE T.trade_id=${con.escape(trades[i].trade_id)}
      GROUP BY M.name`
      
      interface WantMemberType extends RowDataPacket {
        member_id: number;
        name: string;
      }

      const [wantMembers] = await con.query<WantMemberType[]>(sql);
      trades[i] = { ...trades[i], wantMembers }
    }

    return trades as TradeListItemType[];
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 교환글 상세 조회
export const selectTradeDetail = async (tradeId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT T.trade_id, T.user_id, T.voucher_id, T.state, T.amount, T.written_time, T.traded_time,
    P.photocard_id, P.image_name, M.member_id,
    P.name as photo_name, M.name as member_name, G.name as group_name
    FROM Trade as T
    INNER JOIN Voucher as V ON T.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE T.trade_id=${con.escape(tradeId)}`;

    interface DataType extends RowDataPacket, TradeType {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 교환글이 원하는 포토카드 목록 조회
export const selectWantCardsOfTrade = async (tradeId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT P.image_name, 
    P.name as photo_name, M.name as member_name, G.name as group_name,
    P.photocard_id, M.member_id, G.group_id
    FROM TradeWantcard as T
    INNER JOIN Photocard as P ON T.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE T.trade_id=${con.escape(tradeId)}`

    interface DataType extends RowDataPacket, WantcardType {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 교환글 작성
export const writeTrade = async ({ userId, voucherId, amount, wantPhotocardIds }:
  { userId: number; voucherId: number; amount: number; wantPhotocardIds: number[]; }
) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 소유권 상태를 trading으로 변경
    sql = `
    UPDATE Voucher
    SET state=${con.escape('trading')}
    WHERE voucher_id=${con.escape(voucherId)}`
    await con.execute(sql);

    // 교환글 작성
    sql = `
    INSERT INTO Trade (user_id, voucher_id, amount)
    VALUES (${con.escape(userId)}, ${con.escape(voucherId)}, ${con.escape(amount)})`
    const [result] = await con.execute(sql);
    const tradeId = (result as ResultSetHeader).insertId;

    // 교환글이 원하는 포토카드 정보 작성
    for (let photoId of wantPhotocardIds) {
      sql = `
      INSERT INTO TradeWantcard (trade_id, photocard_id)
      VALUES (${con.escape(tradeId)}, ${con.escape(photoId)})`;
      await con.execute(sql);
    }

    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}

// 교환글 삭제
export const deleteTrade = async (trade: TradeType) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 소유권 상태 변경
    sql = `
    UPDATE Voucher
    SET state='available'
    WHERE voucher_id=${con.escape(trade.voucher_id)}`;
    await con.execute(sql);

    // 교환글 삭제
    sql = `DELETE FROM Trade WHERE trade_id=${con.escape(trade.trade_id)}`;
    await con.execute(sql);

    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}