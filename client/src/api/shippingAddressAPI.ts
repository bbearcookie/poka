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

export class deleteShippingAddress {
  static axios = async ({ id }: { id: number; }) => {
    const url = `/api/shipping-address/${id}`;
    const res = await client.delete<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}