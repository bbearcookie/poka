import { client } from "@util/commonAPI";
import { FilterType } from "@component/list/voucher/voucherListSlice";
import { PhotoType } from "@api/photoAPI";

export type VoucherType = PhotoType & {
  voucher_id: number;
  state: string;
  username: string;
  nickname: string;
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

export class getVoucherDetail {
  static axios = async (voucherId: number) => {
    const url = `/api/voucher/${voucherId}`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  };
  static resType = undefined as undefined | VoucherType & {
    message: string;
    user_id: number;
  }
  // static resType = undefined as undefined | VoucherType;
}

export class getAllVoucherList {
  static axios = async (pageParam: number, filter: FilterType) => {
    const url = `/api/voucher`

    let refinedFilter = {
      'GROUP_ID': filter.groups
        .filter(item => item.checked)
        .map(item => item.groupId),
      'MEMBER_ID': filter.members
        .filter(item => item.checked)
        .map(item => item.memberId),
      'PHOTO_NAME': filter.names.map(item => item.value),
      'USER_NAME': filter.usernames.map(item => item.value),
      'VOUCHER_STATE': filter.state
    }

    const params = { pageParam, filter: refinedFilter };
    const res = await client.get<typeof this.resType>(url, { params });
    return res.data;
  };
  static resType = undefined as undefined | {
    message: string;
    vouchers: VoucherType[];
    paging: {
      pageParam: number;
      hasNextPage: boolean;
    }
  };
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