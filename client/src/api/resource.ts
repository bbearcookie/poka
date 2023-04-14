export const BACKEND = 'http://localhost:5000';

export const userImage = (imageName: string | undefined) => imageName ? `${BACKEND}/image/user/${imageName}` : '/user.png';
export const groupImage = (imageName: string | undefined) => `${BACKEND}/image/group/${imageName}`;
export const photoImage = (imageName: string | undefined) => `${BACKEND}/image/photo/${imageName}`;