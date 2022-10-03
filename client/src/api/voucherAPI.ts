import { client } from "@util/commonAPI";
import { FilterType } from "@component/list/voucher/voucherListSlice";

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

export class getAllVoucherList {
  static axios = async (pageParam: number, filter: FilterType) => {
    const url = `/api/voucher`
    const params = { };
    const res = await client.get<typeof this.resType>(url, { params });
    return res.data;
  };
  static resType = undefined as undefined | {
    message: string;
  };
}