import db from '@config/database';

// 포토카드 데이터 수정
export const updatePhoto = async (
  photocardId: number,
  memberId: number,
  name: string,
  imageName: string | undefined
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE Photocard
    SET member_id=${con.escape(memberId)}, 
    name=${con.escape(name)} `; 
    if (imageName) sql += `, image_name=${con.escape(imageName)} `;
    sql += `WHERE photocard_id=${con.escape(photocardId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
};

// 포토카드 이미지 파일 이름 변경 적용
export const updateImagename = async (photocardId: number, imageName: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE Photocard
    SET image_name=${con.escape(imageName)}
    WHERE photocard_id=${con.escape(photocardId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}