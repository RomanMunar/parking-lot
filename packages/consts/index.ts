import { differenceInSeconds } from "date-fns";
import { ParkingSlot, parkingSlotSizesArray } from "./parkingSlot";
import { Vehicle, vehicleSizesArray } from "./vehicle";

export * from "./vehicle";
export * from "./parkingSlot";

export const gridSize = 25;

export const differenceInSecondsToNow = (date: Date) =>
  parseInt(differenceInSeconds(new Date(), date).toString().split(" ")[0], 10);

export const parkingSlots = Array.from(Array(gridSize + 1).keys())
  .slice(1)
  .map((id) => {
    const randomSize = parkingSlotSizesArray[Math.floor(Math.random() * 3)];
    return new ParkingSlot(id, randomSize);
  });

export const vehicles = parkingSlots.map((ps) => {
  const randomSize = vehicleSizesArray[Math.floor(Math.random() * 3)];
  const vehicle = new Vehicle(randomSize);
  vehicle.park(ps);
  return vehicle;
});
