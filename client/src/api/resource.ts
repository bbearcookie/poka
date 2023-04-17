export const BACKEND = process.env.REACT_APP_BACKEND_URL;
export const RESOURCE = process.env.REACT_APP_RESOURCE_URL;

console.log(RESOURCE);

export const userImage = (imageName: string | undefined) =>
  imageName ? `${RESOURCE}/image/user/${imageName}` : '/user.png';
export const groupImage = (imageName: string | undefined) => `${RESOURCE}/image/group/${imageName}`;
export const photoImage = (imageName: string | undefined) => `${RESOURCE}/image/photo/${imageName}`;
