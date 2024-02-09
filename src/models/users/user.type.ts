import {Image} from './../image/image.type';

export interface IUser {
  id?: number;
  email_address?: string;
  is_email_address_verified?: boolean;
  user_name?: string;
  phone_number?: string;
  gender?: string;
  images?: Image[];
  user_profile_picture?: Image;
  date_of_birth?: string;
  user_address?: string;
  description?: string;
  providerId?: string;
}

// {"displayName": "Vipin Vishwakarma", "email": "mainvipin@gmail.com", "emailVerified": true,
//  "isAnonymous": false, "metadata": {"creationTime": 1706166972272, "lastSignInTime": 1706177487224}, 
// "multiFactor": {"enrolledFactors": [Array]}, "phoneNumber": null, 
// "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocIdm4_dAADZXT4JTu-L7bbqsHN2b7iTuYICIg39n6ADkQ=s96-c",
// "providerData": [[Object]], "providerId": "firebase", "tenantId": null, "uid": "FPZaYC0NpJSg96oaL2SNqhnoLPi2"}
