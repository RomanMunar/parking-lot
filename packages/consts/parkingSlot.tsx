import { Vehicle, vehicleSizesArray } from "./vehicle";
import { differenceInSecondsToNow } from ".";

export const parkingSlotSizes = { SP: "small", MP: "medium", LP: "large" };
export const parkingSlotSizeFeeMap: Record<ParkingSlotSize, number> = {
  SP: 20,
  MP: 60,
  LP: 100,
};
export const parkingSlotSizesArray: ParkingSlotSize[] = ["SP", "MP", "LP"];
export type ParkingSlotSize = keyof typeof parkingSlotSizes;

export class ParkingSlot {
  id: number;
  size: ParkingSlotSize;
  distanceFromEntryPoints?: number[]; // Todo
  feePerHour: number;

  hasVehicle?: boolean;
  vehicle?: Vehicle;
  vehicleParkedAt?: Date;

  currentCharge?: number;

  totalCharged: number = 0;

  constructor(_id: number, _size: ParkingSlotSize) {
    this.id = _id;
    this.size = _size;
    this.feePerHour = parkingSlotSizeFeeMap[_size];
  }

  addVehicle(vehicle: Vehicle) {
    this.hasVehicle = true;
    this.vehicle = vehicle;
    this.vehicleParkedAt = new Date();
  }

  removeVehicle() {
    this.hasVehicle = false;
    this.vehicle = undefined;
    const chargedFee = this.calculateCharge();
    this.totalCharged += chargedFee;
    return chargedFee;
  }

  calculateCharge() {
    let fee = 0;
    if (!this.vehicleParkedAt) return 0;

    // 1 hour === 1 second
    const hours = differenceInSecondsToNow(this.vehicleParkedAt);

    // 1 day === 24 seconds
    const days = Math.floor(hours / 24);

    if (days >= 1) fee += days * 5000;

    if (hours > 3) {
      fee += hours * this.feePerHour;
    } else {
      fee += 40;
    }

    return fee;
  }

  vehicleCanPark(vehicle: Vehicle) {
    return (
      vehicleSizesArray.indexOf(vehicle.size) <=
      parkingSlotSizesArray.indexOf(this.size)
    );
  }
}
