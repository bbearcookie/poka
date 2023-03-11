import db from '@config/database';
import { RowDataPacket } from 'mysql2';

// 전체 그룹 목록 조회
export const selectGroups = async () => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT G.group_id as groupId, G.name, G.image_name as imageName,
    (SELECT COUNT(*) FROM MemberData as M WHERE M.group_id=G.group_id) as memberCount
    FROM GroupData AS G`

    interface DataType extends RowDataPacket {
      groupId: number;
      name: string;
      imageName: string;
      memberCount: number;
    }

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 그룹 상세 조회
export const selectGroupDetail = async (groupId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT group_id as groupId, name, image_name as imageName
    FROM GroupData
    WHERE group_id=${con.escape(groupId)}`

    interface DataType extends RowDataPacket {
      groupId: number;
      name: string;
      imageName: string;
    }

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}