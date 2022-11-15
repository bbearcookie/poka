import { client } from "@util/commonAPI";

export interface AddressType {
  id: number;
  user_id: number;
  name: string;
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  address_detail: string;
  requirement: string;
}

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

export class getUserShippingAddress {
  static axios = async (userId: number) => {
    const url = `/api/user/${userId}/shipping-address`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  }
  static resType = undefined as undefined | {
    message: string;
    addresses: AddressType[];
  }
}

export class postShippingAddress {
  static axios = async ({ userId, data }: { userId: number; data: object }) => {
    const url = `/api/user/${userId}/shipping-address`;
    const res = await client.post<typeof this.resType>(url, data);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}