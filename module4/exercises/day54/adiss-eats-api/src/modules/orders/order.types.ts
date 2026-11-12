export type Area = 'Bole' | 'Kazanchis' | 'Piassa' | 'Gerji';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Dish {
  id: number;
  name: string;
  priceSantim: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  phone: string;
  area: Area;
  dishes: Dish[];
  status: OrderStatus;
  totalSantim: number;
}