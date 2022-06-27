export interface ICreateRestaurantDto {
  name: string;
  professional_mail: string;
  phone_number: string;
  address: string;
  description: string;
  keywords: string[];
  terms_of_use: boolean;
}
