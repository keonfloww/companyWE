export interface Image {
  id: number;
  name: string;
  path: string;
  image_type: ImageType;
}

export enum ImageType {
  MainProfileImage = 'main_profile_image',
  ProfileImage = 'profile_image',
}
