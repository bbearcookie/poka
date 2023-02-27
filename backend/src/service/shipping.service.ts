import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ShippingAddressType, ShippingRequestType } from '@type/shipping';
import { VoucherType } from '@type/voucher';
import { makeSalt } from '@util/encrypt';

// 해당 사용자의 모든 배송지 조회
export const selectUserShippingAddressList = async (userId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT address_id as addressId, user_id as userId, name, recipient, contact, postcode, address, address_detail as addressDetail, requirement, prime
    FROM ShippingAddress
    WHERE user_id=${con.escape(userId)}
    ORDER BY prime DESC, address_id`;

    interface DataType extends ShippingAddressType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 정보 상세 조회
export const selectUserShippingAddressDetail = async (addressId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT address_id as addressId, user_id as userId, name, recipient, contact, postcode, address, address_detail as addressDetail, requirement, prime
    FROM ShippingAddress
    WHERE address_id=${con.escape(addressId)}`;

    interface DataType extends ShippingAddressType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 추가
export const insertShippingAddress = async (
  userId: number,
  form: {
    name: string;
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
    prime: number;
  }
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    INSERT INTO ShippingAddress 
    (user_id, name, recipient, contact, postcode, address, address_detail, requirement, prime)
    VALUES (
      ${con.escape(userId)}, 
      ${con.escape(form.name)}, 
      ${con.escape(form.recipient)}, 
      ${con.escape(form.contact)}, 
      ${con.escape(form.postcode)}, 
      ${con.escape(form.address)}, 
      ${con.escape(form.addressDetail)}, 
      ${con.escape(form.requirement)}, 
      ${con.escape(form.prime)}
    )`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 수정
export const updateShippingAddress = async (
  addressId: number,
  form : {
    name: string;
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
  }
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE ShippingAddress
    SET name=${con.escape(form.name)},
    recipient=${con.escape(form.recipient)},
    contact=${con.escape(form.contact)},
    postcode=${con.escape(form.postcode)},
    address=${con.escape(form.address)},
    address_detail=${con.escape(form.addressDetail)},
    requirement=${con.escape(form.requirement)}
    WHERE address_id=${con.escape(addressId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 특정 사용자의 기본 배송지 모두 해제
export const updateUserShippingAddressPrimeFalse = async (userId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE ShippingAddress
    SET prime=0
    WHERE user_id=${con.escape(userId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 기본 배송지 정보 변경
export const updateShippingAddressPrime = async (addressId: number, prime: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE ShippingAddress
    SET prime=${con.escape(prime)}
    WHERE address_id=${con.escape(addressId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자 배송지 삭제
export const deleteShippingAddress = async (addressId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `DELETE FROM ShippingAddress WHERE address_id=${con.escape(addressId)}`;
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 배송 요청 작성
export const insertShippingRequest = async (
  userId: number,
  voucherIds: number[],
  address: {
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
  }
) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 중복되지 않은 결제 UID 생성
    let merchantUID;
    while (1) {
      merchantUID = makeSalt(20);
      sql = `SELECT payment_id as paymentId FROM Payment WHERE merchant_uid=${con.escape(merchantUID)}`;
      const [[payment]] = await con.query<RowDataPacket[]>(sql);
      if (!payment) break; // 생성한 결제 UID가 중복되지 않는다면 반복문 종료
    }

    // 결제 정보 생성
    sql = `
    INSERT INTO Payment (merchant_uid, amount)
    VALUES (${con.escape(merchantUID)}, ${100})`;
    const [payment] = await con.execute(sql);
    const paymentId = (payment as ResultSetHeader).insertId;

    // 배송 요청 생성
    sql = `
    INSERT INTO ShippingRequest (
      user_id, payment_id,
      recipient, contact, postcode, address, address_detail, requirement
    ) VALUES (
      ${con.escape(userId)}, ${con.escape(paymentId)}, ${con.escape(address.recipient)}, ${con.escape(address.contact)}, 
      ${con.escape(address.postcode)}, ${con.escape(address.address)}, ${con.escape(address.addressDetail)}, ${con.escape(address.recipient)}
    )`
    const [request] = await con.execute(sql);
    const requestId = (request as ResultSetHeader).insertId;

    // 소유권 관련 처리
    for (let voucherId of voucherIds) {
      // 소유권 상태 배송대기 상태로 변경.
      sql = `
      UPDATE Voucher
      SET state='shipping'
      WHERE voucher_id=${con.escape(voucherId)}`;
      await con.execute(sql);

      // 배송 요청하는 소유권 정보 생성
      sql = `
      INSERT INTO ShippingRequestVoucher (request_id, voucher_id)
      VALUES (${con.escape(requestId)}, ${con.escape(voucherId)})`
      await con.execute(sql);
    }

    con.commit();
    return requestId;
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}

// 배송 요청 상세 조회
export const selectShippingRequestDetail = async (requestId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT R.request_id as requestId, R.state as requestState,
    R.recipient, R.contact, R.postcode, R.address, R.address_detail as addressDetail,
    R.requirement, R.written_time as writtenTime,
    U.username, U.nickname, U.image_name as userImageName,
    P.payment_id as paymentId, P.merchant_uid as merchantUID, P.amount, P.state as paymentState
    FROM ShippingRequest as R
    INNER JOIN User as U ON R.user_id=U.user_id
    INNER JOIN Payment as P ON R.payment_id=P.payment_id
    WHERE R.request_id=${con.escape(requestId)}`;

    interface DataType extends ShippingRequestType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 배송 요청이 원하는 소유권 정보 조회
export const selectShippingRequestVoucherIds = async (requestId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT P.photocard_id as photocardId, P.name, P.image_name as imageName,
    G.group_id as groupId, G.name as groupName,
    M.member_id as memberId, M.name as memberName,
    V.voucher_id as voucherId, V.state,
    U.username, U.nickname, U.image_name as userImageName
    FROM ShippingRequestVoucher as R
    INNER JOIN Voucher as V ON R.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    INNER JOIN User as U ON V.user_id=U.user_id
    WHERE R.request_id=${con.escape(requestId)}`;

    interface DataType extends VoucherType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 배송 요청 삭제
export const deleteShippingRequest = async (requestId: number, paymentId: number) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 배송 요청에 등록된 소유권 가져오기
    sql = `
    SELECT voucher_id as voucherId
    FROM ShippingRequestVoucher
    WHERE request_id=${con.escape(requestId)}`;
    
    interface VoucherDataType extends RowDataPacket { voucherId: number; }
    const [voucherData] = await con.query<VoucherDataType[]>(sql);
    let voucherIds = voucherData.map(v => v.voucherId);

    // 배송 요청에 등록된 소유권을 이용 가능 상태로 변경
    sql = `
    UPDATE Voucher
    SET state='available'
    WHERE voucher_id IN (${con.escape(voucherIds)})`
    await con.execute(sql);

    // 결제ID가 담긴 결제 정보 삭제
    sql = `DELETE FROM Payment WHERE payment_id=${con.escape(paymentId)}`;
    await con.execute(sql);

    // 배송 요청 삭제
    sql = `DELETE FROM ShippingRequest WHERE request_id=${con.escape(requestId)}`;
    await con.execute(sql);

    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}