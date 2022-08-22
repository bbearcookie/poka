import { client } from "@util/commonAPI";

export class postSignup {
  static axios = async ({ data }: { data: object }) => {
    const url = `/api/auth/signup`;
    const res = await client.post<typeof this.resType>(url, data);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class postLogin {
  static axios = async ({ data }: { data: object }) => {
    const url = `/api/auth/login`;
    const res = await client.post<typeof this.resType>(url, data);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}