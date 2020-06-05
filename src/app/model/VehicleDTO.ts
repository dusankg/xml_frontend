export class VehicleDTO {
  id: number;
  brand: string;
  model: string;
  fuelType: string;
  transmission: string;
  vehicleClass: string;
  price: number;
  mileage: number;
  companyUsername: string;
  startDate: Date;
  endDate: Date;
  limitedRentMileage : boolean;
  allowedMileage : number;
  collisionDamageWaiver: boolean;
  childSeat: number;
  images: Array<string>;
}
