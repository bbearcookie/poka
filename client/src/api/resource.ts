export const BACKEND = process.env.REACT_APP_BACKEND_URL;

export const userImage = (imageName: string | undefined) => imageName ? `${BACKEND}/image/user/${imageName}` : '/user.png';
export const groupImage = (imageName: string | undefined) => `${BACKEND}/image/group/${imageName}`;
export const photoImage = (imageName: string | undefined) => `${BACKEND}/image/photo/${imageName}`;