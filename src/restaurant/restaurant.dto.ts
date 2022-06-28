export interface ICreateRestaurantDto {
  name: string;
  professionalMail: string;
  phoneNumber: string;
  address: string;
  description: string;
  keywords: string[];
  termsOfUse: boolean;
}
