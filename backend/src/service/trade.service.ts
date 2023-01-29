import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { TradeType, TradeListItemType, WantcardType } from '@type/trade';
import { TradeStateType, TradeHistoryType } from '@type/trade';
import { WhereSQL } from '@util/database';
import * as tradeCtrl from '@controller/trade.ctrl';

// 교환글 목록 조회
export const selectTradeList = async (
  groupId: number, memberId: number, excludeUserId: number, state: TradeStateType, 
  itemPerPage: number, pageParam: number
) => {
  const con = await db.getConnection();

  try {
    let sql;
    const where = new WhereSQL();

    sql = `
    SELECT T.trade_id as tradeId, T.user_id as userId, T.voucher_id as voucherId,
    T.state, T.amount, T.written_time as writtenTime, T.traded_time as tradedTime,
    P.photocard_id as photocardId, M.member_id as memberId,
    P.name as photoName, M.name as memberName, G.name as groupName, P.image_name as imageName
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
        operator: 'AND'
      });
    }

    // 작성자 ID 조건
    if (excludeUserId !== 0) {
      where.push({
        query: `NOT T.user_id=${con.escape(excludeUserId)}`,
        operator: 'AND'
      });
    }

    // 거래글 상태 조건
    if (state) {
      where.push({
        query: `T.state=${con.escape(state)}`,
        operator: 'AND'
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
      SELECT M.member_id as memberId, M.name
      FROM TradeWantcard as T
      INNER JOIN Photocard as P ON T.photocard_id=P.photocard_id
      INNER JOIN MemberData as M ON P.member_id=M.member_id
      WHERE T.trade_id=${con.escape(trades[i].tradeId)}
      GROUP BY M.name`
      
      interface WantMemberType extends RowDataPacket {
        memberId: number;
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
    SELECT T.trade_id as tradeId, T.user_id as userId, T.voucher_id as voucherId,
    T.state, T.amount, T.written_time as writtenTime, T.traded_time as tradedTime,
    P.photocard_id as photocardId, M.member_id as memberId,
    P.name as photoName, M.name as memberName, G.name as groupName, P.image_name as imageName
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

// 소유권 ID를 가지고 아직 성사되지 않은 교환글 상세 조회
export const selectTradeDetailByVoucherID = async (voucherId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT T.trade_id as tradeId, T.user_id as userId, T.voucher_id as voucherId,
    T.state, T.amount, T.written_time as writtenTime, T.traded_time as tradedTime,
    P.photocard_id as photocardId, M.member_id as memberId,
    P.name as photoName, M.name as memberName, G.name as groupName, P.image_name as imageName
    FROM Trade as T
    INNER JOIN Voucher as V ON T.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE T.voucher_id=${con.escape(voucherId)} AND T.state='trading'
    ORDER BY T.written_time DESC`;

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
    SELECT P.image_name as imageName, 
    P.name as photoName, M.name as memberName, G.name as groupName,
    P.photocard_id as photocardId, M.member_id as memberId, G.group_id as groupId
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

// 특정 교환글이 원하는 포토카드 중에서 사용자가 소지한 소유권 조회
export const selectHaveVouchersOfTrade = async (userId: number, photoIds: number[]) => {
    const con = await db.getConnection();

    try {
      let sql = `
      SELECT V.voucher_id as voucherId, V.user_id as userId, V.state, U.username, U.nickname,
      P.image_name as imageName, P.photocard_id as photocardId, M.member_id as memberId, G.group_id as groupId,
      P.name, M.name as memberName, G.name as groupName
      FROM Voucher as V
      INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
      INNER JOIN MemberData as M ON P.member_id=M.member_id
      INNER JOIN GroupData as G ON M.group_id=G.group_id
      INNER JOIN User as U ON V.user_id=U.user_id
      WHERE V.photocard_id IN (${con.escape(photoIds)})
      AND V.user_id=${con.escape(userId)}
      AND V.state='available'
      GROUP BY photocard_id`;

      interface DataType extends RowDataPacket { }
      return await con.query<DataType[]>(sql);
    } catch (err) {
      throw err;
    } finally {
      con.release();
    }
}

// 특정 사용자의 소유권 교환 기록 조회
export const selectUserTradeHistory = async (
  itemPerPage: number,
  pageParam: number,
  userId: number,
  filter: typeof tradeCtrl.getUserTradeHistory.filterType
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT
    L.log_id as logId,
    L.voucher_id as voucherId, P.photocard_id as photocardId, P.image_name as photoImageName, P.name as photoName, M.name as memberName, G.name as groupName,
    L.origin_user_id as originUserId, ORI.username as originUserName, ORI.nickname as originUserNickname, ORI.image_name as originUserImageName,
    L.dest_user_id as destUserId, DST.username as destUserName, DST.nickname as destUserNickname, DST.image_name as destUserImageName,
    L.logged_time as loggedTime
    FROM VoucherLog as L
    INNER JOIN User as ORI ON L.origin_user_id=ORI.user_id
    INNER JOIN User as DST ON L.dest_user_id=DST.user_id
    INNER JOIN Voucher as V ON L.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE L.type='traded' AND
    (origin_user_id=${userId} OR dest_user_id=${userId}) AND
    L.logged_time between ${con.escape(filter.startDate)} AND ${con.escape(filter.endDate)}
    ORDER BY L.logged_time DESC
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    interface DataType extends RowDataPacket, TradeHistoryType {}
    return await con.query<DataType[]>(sql);

  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 교환 진행
export const exchangeTrade = async ({ trade, userId, voucherIds }:
  { trade: TradeType; userId: number; voucherIds: number[]; }
) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 교환글 상태 변경, 교환일 변경
    sql = 
    `UPDATE Trade
    SET state='traded', traded_time=now()
    WHERE trade_id=${con.escape(trade.tradeId)}`;
    await con.execute(sql);

    // 교환글의 소유권 변경
    sql = `
    UPDATE Voucher
    SET user_id=${userId}, state='available'
    WHERE voucher_id=${con.escape(trade.voucherId)}`;
    await con.execute(sql);

    sql = `
    INSERT INTO VoucherLog (voucher_id, origin_user_id, dest_user_id, type)
    VALUES (${con.escape(trade.voucherId)}, ${con.escape(trade.userId)}, ${con.escape(userId)}, 'traded')`;
    await con.execute(sql);

    // 사용자의 소유권 변경
    for (let voucherId of voucherIds) {
      sql = `
      UPDATE Voucher
      SET user_id=${trade.userId}, state='available'
      WHERE voucher_id=${con.escape(voucherId)}`;
      await con.execute(sql);

      sql = `
      INSERT INTO VoucherLog (voucher_id, origin_user_id, dest_user_id, type)
      VALUES (${con.escape(voucherId)}, ${con.escape(trade.userId)}, ${con.escape(userId)}, 'traded')`;
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

// 교환글 수정
export const putTrade = async ({ trade, voucherId, amount, wantPhotocardIds }:
  { trade: TradeType; voucherId: number; amount: number; wantPhotocardIds: number[]; }
) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 기존 소유권 상태를 available로 변경
    sql = `
    UPDATE Voucher
    SET state=${con.escape('available')}
    WHERE voucher_id=${con.escape(trade.voucherId)}`
    await con.execute(sql);

    // 기존 wantPhotocard 모두 제거
    sql = `DELETE FROM TradeWantcard WHERE trade_id=${trade.tradeId}`
    await con.execute(sql);

    // 새로운 소유권 사용상태 변경
    sql = `
    UPDATE Voucher
    SET state=${con.escape('trading')}
    WHERE voucher_id=${con.escape(voucherId)}`
    await con.execute(sql);

    // 교환글 수정
    sql = `
    UPDATE Trade
    SET voucher_id=${con.escape(voucherId)}
    WHERE trade_id=${con.escape(trade.tradeId)}`
    await con.execute(sql);

    // 교환글이 원하는 포토카드 정보 작성
    for (let photoId of wantPhotocardIds) {
      sql = `
      INSERT INTO TradeWantcard (trade_id, photocard_id)
      VALUES (${con.escape(trade.tradeId)}, ${con.escape(photoId)})`;
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
    WHERE voucher_id=${con.escape(trade.voucherId)}`;
    await con.execute(sql);

    // 교환글 삭제
    sql = `DELETE FROM Trade WHERE trade_id=${con.escape(trade.tradeId)}`;
    await con.execute(sql);

    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}