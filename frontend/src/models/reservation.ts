// Types for car reservation system
export type CarType = 'SEDAN' | 'SUV' | 'VAN';

export interface CarInventory {
  type: CarType;
  total: number;
}

export interface Reservation {
  id: string;
  carType: CarType;
  startDate: Date;
  days: number;
}

// Example initial inventory
export const initialInventory: CarInventory[] = [
  { type: 'SEDAN', total: 5 },
  { type: 'SUV', total: 3 },
  { type: 'VAN', total: 2 },
];
