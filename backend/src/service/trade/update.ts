import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { TradeDetail } from '@type/trade';

// 교환글 수정
export const updateTrade = async ({
  trade, 
  voucherId, 
  amount, 
  wantPhotocardIds
}: {
  trade: TradeDetail;
  voucherId: number;
  amount: number;
  wantPhotocardIds: number[];
}) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    // 기존 소유권 상태를 available로 변경
    const updateExistingVoucher = new Promise((resolve, reject) => {
      if (!con) return reject(new Error('undefined db connection'));

      let sql = `
      UPDATE Voucher
      SET
        state=${con.escape('available')}
      WHERE voucher_id=${con.escape(trade.voucherId)}`

      con.execute(sql).then(resolve).catch(reject);
    });

    // 새로운 소유권 사용상태 변경
    const updateNewVoucher = new Promise((resolve, reject) => {
      if (!con) return reject(new Error('undefined db connection'));

      let sql = `
      UPDATE Voucher
      SET
        state=${con.escape('trading')}
      WHERE voucher_id=${con.escape(voucherId)}`

      con.execute(sql).then(resolve).catch(reject);
    });

    // 기존 wantPhotocard 모두 제거
    const deleteExistingWantcard = new Promise((resolve, reject) => {
      if (!con) return reject(new Error('undefined db connection'));
      
      let sql = `
      DELETE FROM TradeWantcard
      WHERE trade_id=${trade.tradeId}`

      con.execute(sql).then(resolve).catch(reject);
    });

    // 교환글 수정
    const updateTrade = new Promise((resolve, reject) => {
      if (!con) return reject(new Error('undefined db connection'));

      let sql = `
      UPDATE Trade
      SET
        voucher_id=${con.escape(voucherId)},
        amount=${con.escape(amount)}
      WHERE trade_id=${con.escape(trade.tradeId)}`

      con.execute(sql).then(resolve).catch(reject);
    });

    // 교환글이 원하는 포토카드 정보 작성
    const insertWantcards = wantPhotocardIds.map(photocardId => (
      new Promise((resolve, reject) => {
        if (!con) return reject(new Error('undefined db connection'));

        let sql = `
        INSERT INTO TradeWantcard(
          trade_id,
          photocard_id
        ) VALUES (
          ${con.escape(trade.tradeId)},
          ${con.escape(photocardId)}
        )`;

        con.execute(sql).then(resolve).catch(reject);
      })
    ));

    await Promise.all([
      updateExistingVoucher,
      updateNewVoucher,
      deleteExistingWantcard,
      updateTrade,
      ...insertWantcards
    ]);

    con.commit();
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}

// 교환 진행
export const exchangeTrade = async ({
  tradeId,
  voucherId,
  userId,
  voucherIds
}: {
  tradeId: number;
  voucherId: number;
  userId: number;
  voucherIds: number[];
}) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    // 교환글 상태 변경, 교환일 변경
    const updateTrade = new Promise((resolve, reject) => {
      if (!con) return reject(new Error('undefined db connection'));

      let sql = `
      UPDATE Trade
      SET
        state='traded',
        traded_time=now()
      WHERE trade_id=${con.escape(tradeId)}`;

      con.execute(sql).then(resolve).catch(reject);
    });
    
    // 교환글에 등록된 소유권의 주인과 상태 변경
    const updateTradeVoucher = new Promise((resolve, reject) => {
      if (!con) return reject(new Error('undefined db connection'));

      let sql = `
      UPDATE Voucher
      SET
        user_id=${userId},
        state='available'
      WHERE voucher_id=${con.escape(voucherId)}`;

      con.execute(sql).then(resolve).catch(reject);
    });

    // 교환 기록 추가
    const insertVoucherLog = new Promise((resolve, reject) => {
      if (!con) return reject(new Error('undefined db connection'));

      let sql = `
      INSERT INTO VoucherLog(
        voucher_id,
        origin_user_id,
        dest_user_id,
        type
      ) VALUES (
        ${con.escape(voucherId)},
        ${con.escape(userId)},
        ${con.escape(userId)},
        'traded'
      )`;

      con.execute(sql).then(resolve).catch(reject);
    });

    // 교환 신청한 사용자의 소유권 변경 및 기록 작성
    const updateVouchers = voucherIds.map(voucherId => (
      new Promise((resolve, reject) => {

        // 소유권 변경
        const updateVoucher = new Promise((resolve, reject) => {
          if (!con) return reject(new Error('undefined db connection'));

          let sql = `
          UPDATE Voucher
          SET
            user_id=${con.escape(userId)},
            state='available'
          WHERE voucher_id=${con.escape(voucherId)}`;

          con.execute(sql).then(resolve).catch(reject);
        });

        // 교환 기록 작성
        const insertLog = new Promise((resolve, reject) => {
          if (!con) return reject(new Error('undefined db connection'));
          
          let sql = `
          INSERT INTO VoucherLog(
            voucher_id,
            origin_user_id,
            dest_user_id,
            type
          ) VALUES (
            ${con.escape(voucherId)},
            ${con.escape(userId)},
            ${con.escape(userId)},
            'traded'
          )`;

          con.execute(sql).then(resolve).catch(reject);
        });

        Promise.all([updateVoucher, insertLog]).then(resolve).catch(reject);
      })
    ));

    await Promise.all([
      updateTrade,
      updateTradeVoucher,
      insertVoucherLog,
      ...updateVouchers
    ]);

    con.commit();
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}