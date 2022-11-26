import { client } from "@util/request";

export class getMembersOfGroup {
  static axios = async (groupId: number) => {
    const url = `/api/group/${groupId}/member`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  }
  static resType = undefined as undefined | {
    message: string;
    members: {
      group_id: number;
      member_id: number;
      name: string;
      photo_cnt: number;
    }[];
  }
}

export class getAllGroupList {
  static axios = async () => {
    const url = `/api/group`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  }
  static resType = undefined as undefined | {
    message: string;
    groups: {
      group_id: number;
      name: string;
      image_name: string;
      member_cnt: number;
    }[];
  }
}

export class getGroupDetail {
  static axios = async (groupId: number) => {
    const url = `/api/group/${groupId}`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  }
  static resType = undefined as undefined | {
    message: string;
    group_id: number;
    name: string;
    image_name: string;
    members: {
      group_id: number;
      member_id: number;
      name: string;
      photo_cnt: number;
    }[];
  }
}

export class postGroup {
  static axios = async ({ data }: { data: object }) => {
    const url = `/api/group`;
    const option = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await client.post<typeof this.resType>(url, data, option);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class putGroup {
  static axios = async ({ groupId, data }: { groupId: number; data: object }) => {
    const url = `/api/group/${groupId}`;
    const option = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await client.put<typeof this.resType>(url, data, option);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class deleteGroup {
  static axios = async ({ groupId }: { groupId: number; }) => {
    const url = `/api/group/${groupId}`;
    const res = await client.delete<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}