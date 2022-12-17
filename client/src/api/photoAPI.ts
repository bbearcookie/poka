import { client } from "@util/request";

export type PhotoType = {
  photocard_id: number;
  member_id: number;
  group_id: number;
  name: string;
  group_name: string;
  member_name: string;
  image_name: string;
};

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