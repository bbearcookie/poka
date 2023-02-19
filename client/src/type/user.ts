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