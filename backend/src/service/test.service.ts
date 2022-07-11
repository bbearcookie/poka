import db from '@config/database';

export const saveData = async (name: string, content: string) => {
  const con = await db.getConnection();

  try {
    let sql =
    `INSERT INTO Test(author, content)
    VALUES ('${name}', '${content}')`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
};

export const selectAllData = async () => {
  const con = await db.getConnection();

  try {
    let sql = `SELECT * FROM TEST`;
    const [result] = await con.query(sql);
    return result;
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}