import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { TradeType } from '@type/trade';

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