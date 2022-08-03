import { client } from "@util/commonAPI";

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

export class getMemberDetail {
  static axios = async (memberId: number) => {
    const url = `/api/member/${memberId}`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  }
  static resType = undefined as undefined | {
    message: string;
    group_id: number;
    group_name: string;
    member_id: number;
    name: string;
    photo_cnt: number;
  }
}

export class postMember {
  static axios = async ({ data }: { data: object }) => {
    const url = `/api/member`;
    const res = await client.post<typeof this.resType>(url, data);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
    memberId: number;
  }
}

export class putMember {
  static axios = async ({ memberId, data }: { memberId: number; data: object; }) => {
    const url = `/api/member/${memberId}`;
    const res = await client.put<typeof this.resType>(url, data);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class deleteMember {
  static axios = async ({ memberId }: { memberId: number }) => {
    const url = `/api/member/${memberId}`;
    const res = await client.delete<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}