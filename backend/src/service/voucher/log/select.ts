import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { VoucherLogType } from '@type/voucher';

// 소유권 기록 상세 조회
export const selectVoucherLogDetail = async (
  voucherId: number,
  itemPerPage: number,
  pageParam: number
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT log_id as logId, voucher_id as voucherId,
    origin_user_id as originUserId, dest_user_id as destUserId,
    type, logged_time as loggedTime
    FROM VoucherLog
    WHERE voucher_id=${con.escape(voucherId)}
    ORDER BY logged_time DESC
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    interface DataType extends VoucherLogType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}