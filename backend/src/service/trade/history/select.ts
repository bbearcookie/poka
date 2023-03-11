import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { FilterType } from '@controller/user/trade/getTradeHistory';
import { TradeHistoryType } from '@type/trade';

// 특정 사용자의 소유권 교환 기록 조회
export const selectUserTradeHistory = async (
  itemPerPage: number,
  pageParam: number,
  userId: number,
  filter: FilterType
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