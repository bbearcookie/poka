import { client } from "@util/commonAPI";

export class postVoucher {
  static axios = async ({ data }: { data: object }) => {
    const url = `/api/voucher`;
    const res = await client.post<typeof this.resType>(url, data);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}