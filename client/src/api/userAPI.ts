import { client } from "@util/commonAPI";

export class getUserDetail {
  static axios = async (userId: number) => {
    const url = `/api/user/${userId}`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  }
  static resType = undefined as undefined | {
    message: string;
    user_id: number;
    username: string;
    nickname: string;
    image_name: string;
  }
}

export class putUserProfile {
  static axios = async ({ userId, data }: { userId: number; data: object }) => {
    const url = `/api/user/${userId}/profile`;
    const option = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await client.put<typeof this.resType>(url, data, option);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}