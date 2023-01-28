export interface UserType {
  userId: number;
  username: string;
  nickname: string;
  imageName: string;
}

export interface LoginTokenPayloadType {
  userId: number;
  username: string;
  role: string;
  strategy: string;
}

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