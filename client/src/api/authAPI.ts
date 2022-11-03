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
    user: {
      username: string;
      nickname: string;
      role: string;
      strategy: string;
    }
  }
}

export class postLogout {
  static axios = async () => {
    const url = `/api/auth/logout`;
    const res = await client.post<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class postVerify {
  static axios = async () => {
    const url = `/api/auth/verify`;
    const res = await client.post<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
    user: {
      username: string;
      nickname: string;
      role: string;
      strategy: string;
    }
  }
}