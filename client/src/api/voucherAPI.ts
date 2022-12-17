import { client } from "@util/request";
import { PhotoType } from "@type/photo";

export type VoucherType = PhotoType & {
  voucher_id: number;
  state: string;
  username: string;
  nickname: string;
}

export type LogType = {
  log_id: number;
  voucher_id: number;
  origin_user_id: number;
  dest_user_id: number;
  type: 'issued' | 'traded' | 'shipped';
  logged_time: string;
}

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

export class deleteVoucher {
  static axios = async ({ voucherId }: { voucherId: number; }) => {
    const url = `/api/voucher/${voucherId}`;
    const res = await client.delete<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}