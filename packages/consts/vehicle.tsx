import { ParkingSlot } from "./parkingSlot";

// * Vehicle
export const vehicleSizes = { S: "small", M: "medium", L: "large" };
export type VehicleSize = keyof typeof vehicleSizes;
export const vehicleSizesArray: VehicleSize[] = ["S", "M", "L"];

export class Vehicle {
  size: VehicleSize;

  parked?: boolean;
  parkingSlot?: ParkingSlot;

  constructor(_size: VehicleSize) {
    this.size = _size;
  }

  park(_parkingSlot: ParkingSlot) {
    if (_parkingSlot?.vehicleCanPark(this)) {
      this.parked = true;
      this.parkingSlot = _parkingSlot;

      _parkingSlot.addVehicle(this);
    }
  }

  unpark() {
    const fee = this.parkingSlot?.removeVehicle();
    this.parked = false;
    this.parkingSlot = undefined;
    return fee;
  }
}
