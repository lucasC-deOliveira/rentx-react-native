export interface CarDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  fuel_type: string;
  thumbnail: string;
  accessories: Accessory[];
  period: string;
  price: number;
  photos: {
    id: string;
    photo: string;
  }[];
}

interface Accessory {
  id: string;
  type: string;
  name: string;
}




