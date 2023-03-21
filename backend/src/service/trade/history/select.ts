import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
import { FilterType } from '@controller/user/trade/getTradeHistory';
import { TradeHistory } from '@type/trade';

// 특정 사용자의 소유권 교환 기록 조회
export const selectUserTradeHistory = async (
  itemPerPage: number,
  pageParam: number,
  userId: number,
  filter: FilterType
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    SELECT
      L.log_id as logId,
      L.voucher_id as voucherId,
      JSON_OBJECT(
        'photocardId', P.photocard_id,
        'name', P.name,
        'imageName', P.image_name,
        'groupData', JSON_OBJECT(
          'groupId', G.group_id,
          'name', G.name
        ),
        'memberData', JSON_OBJECT(
          'memberId', M.member_id,
          'name', M.name
        )
      ) as photo,
      JSON_OBJECT(
        'userId', ORI.user_id,
        'username', ORI.username,
        'nickname', ORI.nickname,
        'imageName', ORI.image_name
      ) as originUser,
      JSON_OBJECT(
        'userId', DST.user_id,
        'username', DST.username,
        'nickname', DST.nickname,
        'imageName', DST.image_name
      ) as destUser,
      L.logged_time as loggedTime
    FROM VoucherLog as L
    INNER JOIN Voucher as V ON L.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    INNER JOIN User as ORI ON L.origin_user_id=ORI.user_id
    INNER JOIN User as DST ON L.dest_user_id=DST.user_id
    WHERE L.type='traded' AND
    (origin_user_id=${userId} OR dest_user_id=${userId}) AND
    L.logged_time between ${con.escape(filter.startDate)} AND ${con.escape(filter.endDate)}
    ORDER BY L.logged_time DESC
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    return await con.query<TradeHistory[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}