import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// 사용자에게 소유권 발급
export const insertVouchers = async (
  userId: number,
  vouchers: {
    photocardId: number;
    amount: number;
  }[]
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();
    
    // 단일 소유권 생성 후 발급 로그를 작성하는 프로미스를 반환하는 함수
    const createVoucher = (photocardId: number) => 
      new Promise(async (resolve, reject) => {
        if (!con) throw new Error('undefined db connection');

        try {
          let sql;
  
          // 소유권 생성
          sql = `
          INSERT INTO Voucher(
            user_id,
            photocard_id
          ) VALUES (
            ${con.escape(userId)},
            ${con.escape(photocardId)}
          )`;
          const [result] = await con.execute<ResultSetHeader>(sql);

          // 발급 로그 작성
          sql = `
          INSERT INTO VoucherLog(
            type,
            voucher_id,
            origin_user_id
          ) VALUES (
            ${con.escape('issued')},
            ${con.escape(result.insertId)},
            ${con.escape(userId)}
          )`;

          await con.execute(sql);
          resolve(`${result.insertId} 소유권 생성`);
        } catch (err) {
          reject(err);
        }
      }
    );

    // 발급하려는 모든 포토카드에 대해 반복 수행
    await Promise.all(vouchers.map(voucher => (
      new Promise((resolve, reject) => {

        // 각 포토카드마다 원하는 갯수인 amount 만큼 반복 수행해서 소유권 생성
        Promise.all(
          Array
            .from({ length: voucher.amount })
            .map(_ => createVoucher(voucher.photocardId))
        ).then(resolve).catch(reject);

      })
    )));
    
    con.commit();
  } catch (err) {
    con?.rollback;
    throw err;
  } finally {
    con?.release();
  }
};