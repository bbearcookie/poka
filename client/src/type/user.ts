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

export interface ShippingAddressType {
  addressId: number;
  userId: number;
  name: string;
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  addressDetail: string;
  requirement: string;
  prime: string;
}