import { client } from "@util/commonAPI";

export class getAllPhotoList {
  static axios = async () => {
    const url = `/api/photo`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  }
  static resType = undefined as undefined | {
    message: string;
    photos: {
      photocard_id: number,
      member_id: number,
      group_id: number,
      name: string,
      group_name: string,
      member_name: string,
      image_name: string
    }[];
  }
}

export class getPhotoList {
  static axios = async (limit: number, pageParam: number) => {
    const url = `/api/photo`;
    const params = { limit, pageParam }
    const res = await client.get<typeof this.resType>(url, { params });
    return res.data;
  };
  static resType = undefined as undefined | {
    message: string;
    pageParam: number;
    photos: {
      photocard_id: number,
      member_id: number,
      group_id: number,
      name: string,
      group_name: string,
      member_name: string,
      image_name: string
    }[];
  }
}

export class getPhotoDetail {
  static axios = async (photocardId: number) => {
    const url = `/api/photo/${photocardId}`;
    const res = await client.get<typeof this.resType>(url);
    return res.data;
  };
  static resType = undefined as undefined | {
    message: string;
    photocard_id: number;
    name: string;
    image_name: string;
    group_id: number;
    group_name: string;
    member_id: number;
    member_name: string;
  }
}

export class postPhotos {
  static axios = async ({ data }: { data: object }) => {
    const url = `/api/photo/multiple`;
    const option = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await client.post<typeof this.resType>(url, data, option);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class putPhoto {
  static axios = async ({ photocardId, data }: { photocardId: number; data: object; }) => {
    const url = `/api/photo/${photocardId}`;
    const option = { headers: { 'Content-Type': 'multipart/form-data' } };
    const res = await client.put<typeof this.resType>(url, data, option);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}

export class deletePhoto {
  static axios = async ({ photocardId }: { photocardId: number; }) => {
    const url = `/api/photo/${photocardId}`;
    const res = await client.delete<typeof this.resType>(url);
    return res;
  }
  static resType = undefined as undefined | {
    message: string;
  }
}