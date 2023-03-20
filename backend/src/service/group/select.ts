import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
import { Group, GroupItem } from '@type/group';

// 전체 그룹 목록 조회
export const selectGroups = async () => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    
    let sql = `
    SELECT
      G.group_id as groupId,
      G.name,
      G.image_name as imageName,
      (SELECT COUNT(*)
      FROM MemberData as M
      WHERE M.group_id=G.group_id) as memberCount
    FROM GroupData AS G`;

    return await con.query<GroupItem[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}

// 그룹 상세 조회
export const selectGroupDetail = async (groupId: number) => {
  let con: PoolConnection | undefined;
  
  try {
    con = await db.getConnection();

    let sql = `
    SELECT
      group_id as groupId,
      name,
      image_name as imageName
    FROM GroupData
    WHERE group_id=${con.escape(groupId)}`

    return await con.query<Group[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}