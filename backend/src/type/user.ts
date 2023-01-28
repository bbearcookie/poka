export interface UserType {
  userId: number;
  username: string;
  nickname: string;
  password: string;
  salt: string;
  role: string;
  strategy: string;
  registeredTime: string;
  imageName: string;
}

export interface LoginTokenPayloadType {
  userId: number;
  username: string;
  role: string;
  strategy: string;
}

export interface LoginTokenType extends LoginTokenPayloadType {
  iat: number;
  exp: number;
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