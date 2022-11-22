import { client } from "@util/commonAPI";

export interface AddressType {
  address_id: number;
  user_id: number;
  name: string;
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  address_detail: string;
  requirement: string;
  prime: string;
}

export class putShippingAddress {
  static axios = async ({ addressId, data }: { addressId: number; data: object }) => {
    const url = `/api/shipping-address/${addressId}`;
    const res = await client.put<typeof this.resType>(url, data);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class patchShippingAddressPrime {
  static axios = async (addressId: number) => {
    const url = `/api/shipping-address/${addressId}/prime`;
    const res = await client.patch<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class deleteShippingAddress {
  static axios = async (addressId: number) => {
    const url = `/api/shipping-address/${addressId}`;
    const res = await client.delete<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}