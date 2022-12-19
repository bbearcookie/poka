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

export interface AuthType {
  user_id: number;
  username: string;
  role: string;
  strategy: string;
}