import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
import { VoucherLog } from '@type/voucher';

// 소유권 기록 상세 조회
export const selectVoucherLogDetail = async (
  voucherId: number,
  itemPerPage: number,
  pageParam: number
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    SELECT
      log_id as logId,
      type,
      voucher_id as voucherId,
      origin_user_id as originUserId,
      dest_user_id as destUserId,
      logged_time as loggedTime
    FROM VoucherLog
    WHERE voucher_id=${con.escape(voucherId)}
    ORDER BY logged_time DESC
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    return await con.query<VoucherLog[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}