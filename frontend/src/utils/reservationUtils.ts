import type { CarType, CarInventory, Reservation } from '../models/reservation';

// In-memory store for reservations
let reservations: Reservation[] = [];

// Check if a car of the given type is available for the requested period
export function isCarAvailable(
  carType: CarType,
  startDate: Date,
  days: number,
  inventory: CarInventory[],
): boolean {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);

  // Find total cars of this type
  const carInfo = inventory.find((c) => c.type === carType);
  if (!carInfo) return false;

  // Find overlapping reservations
  const overlapping = reservations.filter((r) => {
    if (r.carType !== carType) return false;
    const rStart = r.startDate;
    const rEnd = new Date(r.startDate);
    rEnd.setDate(rEnd.getDate() + r.days);
    return (
      (startDate < rEnd) && (endDate > rStart)
    );
  });

  // If overlapping reservations < total, car is available
  return overlapping.length < carInfo.total;
}

// Reserve a car if available
export function reserveCar(
  carType: CarType,
  startDate: Date,
  days: number,
  inventory: CarInventory[],
): Reservation | null {
  if (!isCarAvailable(carType, startDate, days, inventory)) {
    return null;
  }
  const reservation: Reservation = {
    id: Math.random().toString(36).slice(2),
    carType,
    startDate,
    days,
  };
  reservations.push(reservation);
  return reservation;
}

// For testing: reset reservations
export function resetReservations() {
  reservations = [];
}

// For testing: get all reservations
export function getReservations() {
  return reservations;
}
