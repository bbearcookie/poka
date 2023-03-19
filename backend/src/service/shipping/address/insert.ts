import db from '@config/database';
import { AddressFormType } from '@controller/user/address/postAddress';

// 사용자 배송지 추가
export const insertUserShippingAddress = async (
  userId: number,
  form: AddressFormType
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    INSERT INTO ShippingAddress(
      user_id,
      name,
      recipient,
      contact,
      postcode,
      address,
      address_detail,
      requirement,
      prime
    ) VALUES (
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