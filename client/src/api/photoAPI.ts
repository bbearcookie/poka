import { client } from "@util/commonAPI";
import { FilterType } from '@component/photo-list/photoListCardSlice';

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
  static axios = async (pageParam: number, filter: FilterType) => {
    const url = `/api/photo`;

    let refinedFilter = {
      'GROUP_ID': filter.groups
        .filter(item => item.checked)
        .map(item => item.groupId),
      'MEMBER_ID': filter.members
        .filter(item => item.checked)
        .map(item => item.memberId),
      'PHOTO_NAME': filter.names.map(item => item.value)
    }

    const params = { pageParam, filter: refinedFilter };
    const res = await client.get<typeof this.resType>(url, { params });
    return res.data;
  };
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
    paging: {
      pageParam: number;
      hasNextPage: boolean;
    };
  }
}

export class getPhotoDetail {
  // 함수 호출할 때 클라이언트에서만 쓰이는 고유한 ID 값이 있다면 넘겨받을 수 있도록 지정.
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