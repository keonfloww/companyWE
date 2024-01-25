import {Image} from './../image/image.type';

export interface IUser {
  id?: number;
  email?: string;
  emailVerified?: boolean;
  userName?: string;
  phone_number?: string;
  images?: Image[];
  main_profile_image?: Image;
  description?: string;
  providerId?: string;
}

// {"displayName": "Vipin Vishwakarma", "email": "mainvipin@gmail.com", "emailVerified": true,
//  "isAnonymous": false, "metadata": {"creationTime": 1706166972272, "lastSignInTime": 1706177487224}, 
// "multiFactor": {"enrolledFactors": [Array]}, "phoneNumber": null, 
// "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocIdm4_dAADZXT4JTu-L7bbqsHN2b7iTuYICIg39n6ADkQ=s96-c",
// "providerData": [[Object]], "providerId": "firebase", "tenantId": null, "uid": "FPZaYC0NpJSg96oaL2SNqhnoLPi2"}
