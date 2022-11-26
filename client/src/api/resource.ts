export const BACKEND = 'http://localhost:5000';

export const userImage = (imageName: string | undefined) => `${BACKEND}/image/user/${imageName}`;
export const groupImage = (imageName: string | undefined) => `${BACKEND}/image/group/${imageName}`;
export const photoImage = (imageName: string | undefined) => `${BACKEND}/image/photo/${imageName}`;