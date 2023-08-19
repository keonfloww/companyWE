import {Image} from './../image/image.type';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  role_id: number;
  images: Image[];
  main_profile_image: Image;
  description: string;
}
